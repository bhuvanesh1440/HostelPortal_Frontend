import "./Signin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rollNo: '',
    phoneNo: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://hostelportal-backend.onrender.com/api/hostler-credentials', {
        RollNumber: formData.rollNo,
        password: formData.password,
        phoneNumber: formData.phoneNo,
        email: formData.email
      });

      console.log(response.data); // Log the response from the backend
      navigate("/"); // Navigate to home page after successful registration
    } catch (error) {
      console.error('Error creating hostler credentials:', error);
      setError('Error creating hostler credentials. Please try again.');
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
          <h1>Student Registration Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="block_block">
              <div className="block">
                <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
                <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
                <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
              </div>
              <div className="block">
                <input type="text" placeholder="Roll No" name="rollNo" value={formData.rollNo} onChange={handleChange} />
                <input type="text" placeholder="Phone No" name="phoneNo" value={formData.phoneNo} onChange={handleChange} />
                <input type="password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
              </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            <input className="submit" value="Register" type="submit" />
            <hr/>
            <button className="signin" type="button" onClick={() => navigate("/login")}>Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signin;
