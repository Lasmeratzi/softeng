import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Sbit.css';
import logo from './lccb.png'; 

function Sbit() {
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
          <li><a href="/shtm" onClick={handleNavigation('/shtm')}>SHTM</a></li>
          <li><a href="/sbit" onClick={handleNavigation('/sbit')}>SBIT</a></li>
          <li><a href="/sslate" onClick={handleNavigation('/sslate')}>SSLATE</a></li>
          <li><a href="/sarfaid" onClick={handleNavigation('/sarfaid')}>SARFAID</a></li> 
          <li><a href="/about" onClick={handleNavigation('/about')}>ABOUT</a></li>
          <li><a href="/ssg" onClick={handleNavigation('/ssg')}>SSG</a></li>
          <li><a href="/clubs" onClick={handleNavigation('/clubs')}>CLUBS</a></li>
        </ul>
        <button className="logout-button11" onClick={handleLogout}>Log out</button>
      </nav>

      <div className="main-section" >
        <h2 className="upcoming-title11">UPCOMING SBIT EVENTS</h2>
        <form className="events-form" onSubmit={handleSubmit}>
          <h1>Department-ID</h1>
          <input type="text" placeholder="Department" className="input-field" />
          <h1>Club Name</h1>
          <input type="text" placeholder="Club Name" className="input-field" />
          <h1>Event Name</h1>
          <input type="text" placeholder="Event Name" className="input-field" />
          <h1>Venue</h1>
          <input type="text" placeholder="Venue" className="input-field" />
          <h1>Date</h1>
          <input type="date" className="input-field" />
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Sbit;
