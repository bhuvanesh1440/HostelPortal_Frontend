import React, { useState } from 'react';
import './ManageStudents.css';
import axios from 'axios';

const ManageStudents = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    RollNo: '',
    hostelid: '',
    FirstName: '',
    LastName: '',
    Semester: '',
    Gender: '',
    Department: '',
    PhoneNo: '',
    FatherName: '',
    FatherMobileNumber: '',
    DOB: '',
    Email: ''
  });

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post('https://hostelportal-backend.onrender.com/api/hostelers', formData);
      console.log(response.data); // Log the response from the backend

      // Set success message
      setMessage('Student added successfully!');
      setMessageType('success');

      // Reset the form
      setFormData({
        RollNo: '',
        hostelid: '',
        FirstName: '',
        LastName: '',
        Semester: '',
        Gender: '',
        Department: '',
        PhoneNo: '',
        FatherName: '',
        FatherMobileNumber: '',
        DOB: '',
        Email: ''
      });
    } catch (error) {
      console.error('Error submitting student data:', error);
      
      // Set error message
      setMessage('Error submitting student data (Duplicate data). Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div className="manage-students-form">
      <h2>Student Registration Form</h2>
      
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="RollNo">Roll Number:</label>
          <input
            type="text"
            id="RollNo"
            name="RollNo"
            value={formData.RollNo}
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
        <div className="form-group">
          <label htmlFor="FirstName">First Name:</label>
          <input
            type="text"
            id="FirstName"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="LastName">Last Name:</label>
          <input
            type="text"
            id="LastName"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Semester">Semester:</label>
          <input
            type="text"
            id="Semester"
            name="Semester"
            value={formData.Semester}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Gender">Gender:</label>
          <input
            type="text"
            id="Gender"
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Department">Department:</label>
          <input
            type="text"
            id="Department"
            name="Department"
            value={formData.Department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="PhoneNo">Phone Number:</label>
          <input
            type="text"
            id="PhoneNo"
            name="PhoneNo"
            value={formData.PhoneNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="FatherName">Father's Name:</label>
          <input
            type="text"
            id="FatherName"
            name="FatherName"
            value={formData.FatherName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="FatherMobileNumber">Father's Mobile Number:</label>
          <input
            type="text"
            id="FatherMobileNumber"
            name="FatherMobileNumber"
            value={formData.FatherMobileNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="DOB">Date of Birth:</label>
          <input
            type="date"
            id="DOB"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Email">Email:</label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="button-group">
          <button type="submit">Submit</button>
          <button type="button" onClick={closeForm}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default ManageStudents;
