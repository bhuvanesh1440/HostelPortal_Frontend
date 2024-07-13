import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NotReturned.css'; // Style your table as needed

const NotReturned = () => {
    const [permissions, setPermissions] = useState([]);
    const [leaves, setLeaves] = useState([]);
    const [showPermissions, setShowPermissions] = useState(true); // State to toggle between permissions and leaves
    const [notification, setNotification] = useState(''); // State to show notification message

    useEffect(() => {
        fetchNotReturnedRequests();
    }, []);

    const fetchNotReturnedRequests = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/requests/not-returned');
            const notReturnedRequests = response.data;

            const permissions = notReturnedRequests.filter(request => request.requestType === 'permission');
            const leaves = notReturnedRequests.filter(request => request.requestType === 'leave');

            setPermissions(permissions);
            setLeaves(leaves);
        } catch (error) {
            console.error('Error fetching not returned requests:', error);
        }
    };

    const handleMarkAsReturned = async (id) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/requests/mark-returned/${id}`);
            if (response.status === 200) {
                setNotification('Request marked as returned and parent notified');
                setTimeout(() => setNotification(''), 5000); // Hide notification after 5 seconds
                fetchNotReturnedRequests(); // Refetch the data to update the tables
            } else {
                console.error('Error marking request as returned:', response.statusText);
            }
        } catch (error) {
            console.error('Error marking request as returned:', error);
        }
    };
    

    return (
        <div className="not-returned-requests">
            <h2>Not Returned Requests</h2>
            {notification && <div className="notification">{notification}</div>} {/* Notification message */}
            <div className="toggle-buttons">
                <button onClick={() => setShowPermissions(true)}>Permissions</button>
                <button onClick={() => setShowPermissions(false)}>Leaves</button>
            </div>
            {showPermissions ? (
                <div>
                    <h3>Permission Requests</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Roll Number</th>
                                <th>Hostel ID</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>From Time</th>
                                <th>To Time</th>
                                <th>Reason</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {permissions.map((permission) => (
                                <tr key={permission._id}>
                                    <td>{permission.name}</td>
                                    <td>{permission.rollno}</td>
                                    <td>{permission.hostelid}</td>
                                    <td>{new Date(permission.startDate).toLocaleDateString()}</td>
                                    <td>{new Date(permission.endDate).toLocaleDateString()}</td>
                                    <td>{permission.fromTime}</td>
                                    <td>{permission.toTime}</td>
                                    <td>{permission.reason}</td>
                                    <td>
                                        <button className='return' onClick={() => handleMarkAsReturned(permission._id)}>Mark as Returned</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    <h3>Leave Requests</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Roll Number</th>
                                <th>Hostel ID</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>From Time</th>
                                <th>To Time</th>
                                <th>Reason</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaves.map((leave) => (
                                <tr key={leave._id}>
                                    <td>{leave.name}</td>
                                    <td>{leave.rollno}</td>
                                    <td>{leave.hostelid}</td>
                                    <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                                    <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                                    <td>{leave.fromTime}</td>
                                    <td>{leave.toTime}</td>
                                    <td>{leave.reason}</td>
                                    <td>
                                        <button className='return' onClick={() => handleMarkAsReturned(leave._id)}>Mark as Returned</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default NotReturned;
