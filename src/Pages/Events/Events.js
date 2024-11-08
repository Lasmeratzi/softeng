import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Events.css';
import logo from './lccb.png'; 

function Events() {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    navigate('/');
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

      <div className="main-section" >
        <h2 className="upcoming-title11">LCCB CLUB EVENTS</h2>
        <form className="events-form" onSubmit={handleSubmit}>
          <h1>Event-ID</h1>
          <input type="text" placeholder="Event ID" className="input-field" />
          <h1>Club-ID</h1>
          <input type="text" placeholder="Club ID" className="input-field" />
          <h1>Event Name</h1>
          <input type="text" placeholder="Event Name" className="input-field" />
          <h1>Event Details</h1>
          <input type="text" placeholder="Event Details" className="input-field" />
          <h1>Event Venue</h1>
          <input type="text" placeholder="Event Venue" className="input-field" />
          <h1>Event Date</h1>
          <input type="date" placeholder="Event Date" className="input-field" />
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Events;
