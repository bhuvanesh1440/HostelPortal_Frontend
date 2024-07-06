// AdminPermissions.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPermissions.css'; // Style your table as needed

const AdminPermissions = () => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/permissions');
        setPermissions(response.data);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    fetchPermissions();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await axios.patch(`http://localhost:5000/permissions/${id}`, { status });
      setPermissions((prevPermissions) =>
        prevPermissions.map((permission) =>
          permission._id === id ? { ...permission, status: response.data.status } : permission
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="admin-permissions">
      <h2>Permission Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>From Time</th>
            <th>To Time</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission._id}>
              <td>{permission.name}</td>
              <td>{permission.rollNumber}</td>
              <td>{permission.fromTime}</td>
              <td>{permission.toTime}</td>
              <td>{permission.date}</td>
              <td>{permission.status}</td>
              <td>
                <button className='approve' onClick={() => handleUpdateStatus(permission._id, 'approved')}>Approve</button>
                <button className='reject' onClick={() => handleUpdateStatus(permission._id, 'rejected')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPermissions;
