import React, { useState } from "react";
import './Login.css';
import logo from './lccb.png';
import backgroundImage from './lccbwp.jpg';
import { useNavigate } from 'react-router-dom'; 
import { useSpring, animated } from 'react-spring';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [shake, setShake] = useState(false); // State to trigger shake animation
  const [fadeIn, setFadeIn] = useState(false); // State to trigger fade-in animation
  const navigate = useNavigate(); 

  const handleAdminLogin = () => {
    navigate('/events'); 
  };

  const handleSuperAdminLogin = () => {
    navigate('/departments'); 
  };

  const handleRegularLogin = () => {
    const userData = {
      user: username,
      password: password,
    };

    // Within the handleRegularLogin function
fetch('http://localhost:5000/api/users/login', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(userData),
})
  .then(response => response.json())
  .then(data => {
      if (data.message === 'Login successful') {
          sessionStorage.setItem('isLoggedIn', true);
          sessionStorage.setItem('user_id', data.user_id); // Store user_id
          toast.success("Login successful", {
              position: "top-center",
              autoClose: 5000,
          });
          setFadeIn(true); 
          setTimeout(() => navigate('/shome', { state: { loggedIn: true } }), 500); 
      } else {
          setShake(true); 
          setErrorMessage('Invalid username or password'); 
          setTimeout(() => setShake(false), 500); 
      }
  })
  .catch(error => {
      setShake(true); 
      setErrorMessage('Error logging in'); 
      setTimeout(() => setShake(false), 500); 
      console.error('Error logging in:', error);
  });

  };

  const handleSignUpRedirect = () => {
    navigate('/signup'); 
  };

  const fadeStyles = useSpring({
    opacity: fadeIn ? 0 : 1, // Fade out on successful login
    config: { duration: 300 },
  });

  const shakeStyles = useSpring({
    transform: shake ? 'translateX(10px)' : 'translateX(0px)',
    config: { duration: 50, tension: 360, friction: 6 },
  });

  const bounceStyles = useSpring({
    transform: shake ? 'scale(1.1)' : 'scale(1)',
    config: { duration: 200, tension: 200, friction: 5 },
  });

  return (
    <animated.div style={fadeStyles} className="login-container">
      <ToastContainer />
      <div className="left-section">
        <img src={backgroundImage} alt="LCCB Background" className="background-image" />
        <h1 className="college-title"></h1>
        <h2 className="college-title2"></h2>
      </div>
      <div className="right-section">
        <img src={logo} alt="LCCB Logo" className="logo" />
        <h2 className="login-title">LCCB NEXUS</h2>
        <p className="subtitle">Enter your details to sign in to your account</p>
        {errorMessage && <animated.p style={bounceStyles} className="error-message">{errorMessage}</animated.p>} 
        <h3>Log in</h3>
        <animated.div style={shakeStyles}>
          <input 
            type="text" 
            placeholder="Username" 
            className="input-field2" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="input-field2" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </animated.div>
        <div className="button-container">
          <button className="login-button" onClick={handleRegularLogin}>Log in</button>
          <button className="admin-button" onClick={handleAdminLogin}>Log in as Admin</button>
          <button className="superadmin-button" onClick={handleSuperAdminLogin}>Log in as Super Admin</button>
        </div>
        <p className="signup-text">
          Don’t have an account? <a href="#" onClick={handleSignUpRedirect}>Sign up here!</a>
        </p>
      </div>
    </animated.div>
  );
}

export default Login;
