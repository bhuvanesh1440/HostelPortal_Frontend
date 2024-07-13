import "./Login.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation in React Router v6
import { useAuth } from "./AuthContext"; // Import the useAuth hook

function Login() {
  const { setAuthState } = useAuth(); // Get the setAuthState function from the context
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "admin", // Default to admin based on your select options
  });
  const navigate = useNavigate(); // useNavigate for navigation in React Router v6
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const Register = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      let loginRoute = '';
      let userData;
  
      // Determine login route based on selected role
      if (formData.role === "student") {
        loginRoute = "http://localhost:5000/api/hostler-credentials/login";
        response = await axios.post(loginRoute, {
          RollNumber: formData.username,
          password: formData.password,
        });
        userData = response.data; // Assuming response contains user data
      } else if (formData.role === "admin") {
        loginRoute = "http://localhost:5000/api/admins/login";
        response = await axios.post(loginRoute, {
          username: formData.username,
          password: formData.password,
        });
        const adminResponse = await axios.get(`http://localhost:5000/api/admins/${formData.username}`);
        userData = adminResponse.data; // Assuming response contains admin data
      } else {
        setError("Invalid role selected");
        return;
      }
  
      // Handle successful login
      if (response.data.success) {
        // Store user data to localStorage
        localStorage.setItem('user', JSON.stringify({
          name: formData.username,
          role: formData.role,
          userData: userData,
        }));
  
        // Set authentication state and user data
        setAuthState({
          isAuthenticated: true,
          role: formData.role,
          userData: userData,
        });
  
        navigate("/home"); // Redirect to home
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      if (error.response && error.response.status === 401) {
        setError("Invalid credentials. Please try again.");
      } else {
        setError("Error logging in. Please try again later.");
      }
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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <select
              value={formData.role}
              name="role"
              onChange={handleChange}
              required
            >
              <option value="admin">Admin</option>
              <option value="student">Student</option>
            </select>
            {error && <p className="error-message">{error}</p>}
            <input className="submit" value="Login" type="submit" />
            <div className="bottom_login_elements">
              <button className="signin" onClick={Register}>Register</button>
              <button>Forgot Password</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
