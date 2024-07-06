import React, { useState } from 'react';
import './ManageStudents.css';
import axios from 'axios';

const ManageStudents = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    rollno: '',
    hostelid: '',
    name: '',
    phone_no: '',
    parent_name: '',
    parent_phone: '',
    dateOfBirth: '',
    address: '',
    email: '',
    yearOfStudy: '',
    course: '',
    isinout: false,
    guardianContact: '',
    emergencyContact: '',
    bloodGroup: '',
    medicalConditions: ''
  });

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post('http://localhost:5000/api/students/add', formData);
      console.log(response.data); // Log the response from the backend

      // Set success message
      setMessage('Student added successfully!');
      setMessageType('success');

      // Reset the form
      setFormData({
        rollno: '',
        hostelid: '',
        name: '',
        phone_no: '',
        parent_name: '',
        parent_phone: '',
        dateOfBirth: '',
        address: '',
        email: '',
        yearOfStudy: '',
        course: '',
        isinout: false,
        guardianContact: '',
        emergencyContact: '',
        bloodGroup: '',
        medicalConditions: ''
      });
    } catch (error) {
      console.error('Error submitting student data:', error);
      
      // Set error message
      setMessage('Error submitting student data(Duplicate data). Please try again.');
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
          <label htmlFor="rollno">Roll Number:</label>
          <input
            type="text"
            id="rollno"
            name="rollno"
            value={formData.rollno}
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
          <label htmlFor="phone_no">Phone Number:</label>
          <input
            type="text"
            id="phone_no"
            name="phone_no"
            value={formData.phone_no}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="parent_name">Parent's Name:</label>
          <input
            type="text"
            id="parent_name"
            name="parent_name"
            value={formData.parent_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="parent_phone">Parent's Phone:</label>
          <input
            type="text"
            id="parent_phone"
            name="parent_phone"
            value={formData.parent_phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="yearOfStudy">Year of Study:</label>
          <input
            type="text"
            id="yearOfStudy"
            name="yearOfStudy"
            value={formData.yearOfStudy}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="course">Course:</label>
          <input
            type="text"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="isinout">Is In/Out:</label>
          <input
            type="checkbox"
            id="isinout"
            name="isinout"
            checked={formData.isinout}
            onChange={handleChange}
          /> 
        </div>*/}
        <div className="form-group">
          <label htmlFor="guardianContact">Guardian Contact:</label>
          <input
            type="text"
            id="guardianContact"
            name="guardianContact"
            value={formData.guardianContact}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emergencyContact">Emergency Contact:</label>
          <input
            type="text"
            id="emergencyContact"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bloodGroup">Blood Group:</label>
          <input
            type="text"
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="medicalConditions">Medical Conditions:</label>
          <input
            type="text"
            id="medicalConditions"
            name="medicalConditions"
            value={formData.medicalConditions}
            onChange={handleChange}
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
