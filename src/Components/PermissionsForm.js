import React, { useState } from 'react';
import './PermissionsForm.css';
import axios from 'axios';

const PermissionsForm = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    hostelid: '',
    requestType: 'permission',
    leaveType: '',
    startDate: '',
    endDate: '',
    fromTime: '',
    toTime: '',
    reason: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/management/request-permission', formData);
      console.log(response.data); // Log the response from the backend
      setMessage('Request submitted successfully!');
      setMessageType('success');
      setFormData({
        name: '',
        rollNumber: '',
        hostelid: '',
        requestType: 'permission',
        leaveType: '',
        startDate: '',
        endDate: '',
        fromTime: '',
        toTime: '',
        reason: ''
      });
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error.response && error.response.data ? error.response.data : 'Error submitting request. Please try again.';
      setMessage(errorMessage);
      setMessageType('error');
    }
  };

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const handleRequestTypeChange = (e) => {
    setFormData({ ...formData, requestType: e.target.value });
  };

  return (
    <div className="permissions-form">
      <h2>Permissions & Leaves Form</h2>
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="radio-group">
          <input
            type="radio"
            id="permission"
            name="requestType"
            value="permission"
            checked={formData.requestType === 'permission'}
            onChange={handleRequestTypeChange}
          />
          <label htmlFor="permission">Permission</label>

          <input
            type="radio"
            id="leave"
            name="requestType"
            value="leave"
            checked={formData.requestType === 'leave'}
            onChange={handleRequestTypeChange}
          />
          <label htmlFor="leave">Leave</label>
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rollNumber">Roll Number:</label>
          <input
            type="text"
            id="rollNumber"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="hostelid">Hostel ID:</label>
          <input
            type="text"
            id="hostelid"
            name="hostelid"
            value={formData.hostelid}
            onChange={handleChange}
            required
          />
        </div>
        
        {formData.requestType === 'permission' ? (
          <>
            <div className="form-group">
              <label htmlFor="fromTime">From Time:</label>
              <input
                type="time"
                id="fromTime"
                name="fromTime"
                value={formData.fromTime}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="toTime">To Time:</label>
              <input
                type="time"
                id="toTime"
                name="toTime"
                value={formData.toTime}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Date:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="leaveType">Leave Type:</label>
              <select
                id="leaveType"
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                required
              >
                <option value="">Select leave type</option>
                <option value="sick">Sick Leave</option>
                <option value="casual">Casual Leave</option>
                <option value="annual">Annual Leave</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="startDate">From Date:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="fromTime">From Time:</label>
              <input
                type="time"
                id="fromTime"
                name="fromTime"
                value={formData.fromTime}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">To Date:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              /> 
            </div>
            <div className="form-group">
              <label htmlFor="toTime">To Time:</label>
              <input
                type="time"
                id="toTime"
                name="toTime"
                value={formData.toTime}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="reason">Reason & Travelling Info:</label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </>
        )}

        
        
        <div className="button-group">
          <br />
          <button type="submit">Submit</button>
          <button type="button" onClick={closeForm}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default PermissionsForm;
