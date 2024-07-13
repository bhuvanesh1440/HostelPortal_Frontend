import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NotApprovedRequests.css'; // Style your table as needed

const NotApprovedRequests = () => {
  const [permissions, setPermissions] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [showPermissions, setShowPermissions] = useState(true); // State to toggle between permissions and leaves
  const [notification, setNotification] = useState(''); // State to show notification message
  const [adminName, setAdminName] = useState(''); // State to store the admin's name

  useEffect(() => {
    fetchNotApprovedRequests();
    // Fetch the admin's name from the session or context (this is a placeholder)
    const adminDataString = localStorage.getItem('admin');
    console.log(adminDataString)
    if (adminDataString) {
      const adminData = JSON.parse(adminDataString);
      setAdminName(adminData.name);
    }
  }, []);

  const fetchNotApprovedRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/requests/not-approved');
      const notApprovedRequests = response.data;

      const permissions = notApprovedRequests.filter(request => request.requestType === 'permission');
      const leaves = notApprovedRequests.filter(request => request.requestType === 'leave');

      setPermissions(permissions);
      setLeaves(leaves);
    } catch (error) {
      console.error('Error fetching not approved requests:', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/requests/${id}/approve`, { acceptedBy: adminName });
      
      if (response.status === 200) {
        setNotification('Request approved and parent notified');
        setTimeout(() => setNotification(''), 5000); // Hide notification after 5 seconds
        fetchNotApprovedRequests(); // Refetch the data to update the tables
      } else {
        console.error('Error approving request:', response.statusText);
      }
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  return (
    <div className="not-approved-requests">
      <h2>Not Approved Requests</h2>
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
                  <td>{permission.startDate}</td>
                  <td>{permission.endDate}</td>
                  <td>{permission.fromTime}</td>
                  <td>{permission.toTime}</td>
                  <td>{permission.reason}</td>
                  <td>
                    <button className='approve' onClick={() => handleApprove(permission._id)}>Approve</button>
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
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{leave.fromTime}</td>
                  <td>{leave.toTime}</td>
                  <td>{leave.reason}</td>
                  <td>
                    <button className='approve' onClick={() => handleApprove(leave._id)}>Approve</button>
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

export default NotApprovedRequests;
