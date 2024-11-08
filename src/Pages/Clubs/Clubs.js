import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Clubs.css';
import logo from './lccb.png'; 

function Clubs() {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    navigate('/');  // Redirect to the homepage or login page
  };

  const handleNavigation = (path) => (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    navigate(path); // Use navigate to go to the new route
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Add form submission logic here if needed
  };

  return (
    <div className="profile-container">
      <nav className="navbar11">
        <img src={logo} alt="LCCB Logo" className="logo11" />
        <h1 className="site-title11">LCCB-CLUBSPHERE</h1>
        <ul className="nav-links11">
          <li><a href="/departments" onClick={handleNavigation('/departments')}>DEPARTMENTS</a></li>
          <li><a href="/events" onClick={handleNavigation('/events')}>EVENTS</a></li>
          <li><a href="/clubs" onClick={handleNavigation('/clubs')}>CLUBS</a></li>
        </ul>
        <button className="logout-button11" onClick={handleLogout}>Log out</button>
      </nav>

      <div className="main-section">
        <h2 className="upcoming-title11">LCCB CLUBS</h2>
        <form className="events-form" onSubmit={handleSubmit}>
          <h1>Club-ID</h1>
          <input type="text" placeholder="Club ID" className="input-field" />
          <h1>Department-ID</h1>
          <input type="text" placeholder="Department Name" className="input-field" />
          <h1>Club Logo</h1>
          <input type="file" accept="image" className="input-field" />
          <h1>Club Name</h1>
          <input type="text" placeholder="Club Name" className="input-field" />
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
      </div> /* This is the closing div */
  );  // Ensure there's a closing parenthesis here for the return
}

export default Clubs;  // Export the Clubs component correctly
