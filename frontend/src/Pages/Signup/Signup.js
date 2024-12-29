import React, { useState, useEffect } from "react";
import './Signup.css';
import logo from './lccb.png';
import backgroundImage from './lccbwp.jpg';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSpring, animated } from 'react-spring';

function Signup() {
  const [departments, setDepartments] = useState([]); // State to store departments
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // New state for email
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [isFading, setIsFading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the departments from your backend or an API
    fetch('http://localhost:5000/api/departments')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched departments:', data);
        setDepartments(data);
      })
      .catch(error => console.error('Error fetching departments:', error));
  }, []);

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Prepare user data for signup
    const userData = {
      user: username,
      email: email,
      department_id: selectedDepartment,
      password: password,
    };

    // Make API call to create the user
    fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => {
        if (response.ok) {
          toast.success('Account created successfully! Please log in.', {
            position: "top-right",
            autoClose: 3000, // Automatically close after 3 seconds
          });
        } else {
          toast.error('Error signing up: ' + response.statusText, {
            position: "top-right",
          });
        }
      })
      .catch(error => {
        console.error('Error signing up:', error);
        toast.error('Error signing up: ' + error.message, {
          position: "top-right",
        });
      });
  };

  const handleNavigation = (path) => {
    setIsFading(true);
    setTimeout(() => {
      navigate(path); 
    }, 300); // Match the duration of the animation
  };

  const fadeStyles = useSpring({
    opacity: isFading ? 0 : 1,
    config: { duration: 300 },
  });

  return (
    <animated.div style={fadeStyles} className="signup-container">
      <div className="left-section">
        <img src={backgroundImage} alt="LCCB Background" className="background-image" />
        <h1 className="college-title"></h1>
        <h2 className="college-title2"></h2>
      </div>
      <div className="right-section">
        <img src={logo} alt="LCCB Logo" className="logo" />
        <h2 className="signup-title">LCCB NEXUS</h2>
        <p className="subtitle">Enter your details to create your account</p>
        <h3>Sign Up</h3>
        <input 
          type="text" 
          placeholder="Username" 
          className="input-field2" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          className="input-field2" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <select 
          className="input-field2" 
          value={selectedDepartment} 
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          {departments.map(department => (
            <option key={department.department_id} value={department.department_id}>
              {department.department_name}
            </option>
          ))}
        </select>
        <input 
          type="password" 
          placeholder="Password" 
          className="input-field2" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Confirm Password" 
          className="input-field2" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
        />
        <div className="button-container">
          <button className="signup-button" onClick={handleSignUp}>Sign Up</button>
        </div>
        <p className="login-text">
          Already have an account? <a href="#" onClick={() => handleNavigation('/')}>Log in here!</a>
        </p>
        <ToastContainer />
      </div>
    </animated.div>
  );
}

export default Signup;
