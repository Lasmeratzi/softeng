import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Ahome.css';
import logo from './lccb.png'; 
import background from './lccb2.png'; 

function Ahome() {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    navigate('/');
  };

  const preventNavigation = (e) => {
    e.preventDefault(); 
  };

  return (
    <div className="profile-container">
      <nav className="navbar">
        <img src={logo} alt="LCCB Logo" className="logo" />
        <h1 className="site-title">LCCB - CLUBSPHERE</h1>
        <ul className="nav-links">
          <li><a href="/home" onClick={preventNavigation}>HOME</a></li> 
          <li><a href="/about">ABOUT</a></li>
          <li><a href="/ssg">SSG</a></li>
          <li><a href="/clubs">CLUBS</a></li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>Log out</button>
      </nav>

      <div className="main-section" style={{ backgroundImage: `url(${background})` }}>
        <h2 className="upcoming-title">UPCOMING EVENTS</h2>
        <form className="events-form">
          <h1>Department</h1>
          <input type="text" placeholder="Department" className="input-field" />
          <h1>Club Name</h1>
          <input type="text" placeholder="Club Name" className="input-field" />
          <h1>Event Name</h1>
          <input type="text" placeholder="Event Name" className="input-field" />
          <h1>Venue</h1>
          <input type="text" placeholder="Venue" className="input-field" />
          <h1>Date</h1>
          <input type="date" placeholder="Date" className="input-field" />
          <button className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Ahome;
