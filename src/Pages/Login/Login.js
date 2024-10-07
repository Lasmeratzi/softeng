import React from "react";
import './Login.css';
import logo from './lccb.png';
import backgroundImage from './lccbwp.jpg';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function Login() {
  const navigate = useNavigate(); // Get the navigation function

  const handleAdminLogin = () => {
    // Simulate admin login (replace with your actual logic)
    navigate('/shtm'); // Navigate to the admin home page on successful admin login
  };

  const handleRegularLogin = () => {
    // Simulate regular login (replace with your actual logic)
    navigate('/user'); // Navigate to the regular user home page on successful regular loginsssss
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <img src={backgroundImage} alt="LCCB Background" className="background-image" />
        <h1 className="college-title">LA CONSOLACION</h1>
        <h2 className="college-title2">COLLEGE - BACOLOD</h2>
      </div>
      <div className="right-section">
        <img src={logo} alt="LCCB Logo" className="logo" />
        <h2 className="login-title">CLUBSPHERE</h2>
        <p className="subtitle">Enter your details to sign in to your account</p>
        <h3>Log in</h3>
        <input type="text" placeholder="Username" className="input-field2" />
        <input type="password" placeholder="Password" className="input-field2" />
        <div className="button-container">
          <button className="login-button" onClick={handleRegularLogin}>Log in</button>
          <button className="admin-button" onClick={handleAdminLogin}>Log in as Admin</button>
        </div>
        <p className="signup-text">
          Don’t have an account? <a href="#">Sign up here!</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
