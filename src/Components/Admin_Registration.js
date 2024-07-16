import React, { useState } from 'react';
import axios from 'axios';
import './Admin_Registration.css';

const AdminRegistration = () => {
  const [formData, setFormData] = useState({
    hostelid: '',
    phoneNo: '',
    password: '',
    name: '',
    username: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post('https://hostelportal-backend.onrender.com/api/admins', formData);
      console.log('Admin created:', response.data);
      setSuccessMessage('Admin created successfully.');
      setFormData({
        hostelid: '',
        phoneNo: '',
        password: '',
        name: '',
        username: '',
        confirmPassword: '',
      });
      setError(null); // Clear any previous error messages
    } catch (error) {
      console.error('Error creating admin:', error);
      setError('Error creating admin. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <>
      <div className="login_container">
        <div className="login_block">
          <img
            src="/images/Nec.png"
            alt="Logo"
            className="logo-img"
            width="60px"
          />
          <h1>Admin Registration Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="block_block">
              <div className="block">
                <input
                  type="text"
                  placeholder="Hostel ID"
                  name="hostelid"
                  value={formData.hostelid}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="block">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <input className="submit" value="Register" type="submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminRegistration;
