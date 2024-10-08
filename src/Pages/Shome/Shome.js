import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Shome.css';
import logo from './lccb.png';  

function Shome() {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    navigate('/');
  };

  const preventNavigation = (e) => {
    e.preventDefault(); 
  };

  const handleDropdownChange = (e) => {
    console.log(`Selected: ${e.target.value}`);
  };

  return (
    <div className="shome-container">
      <nav className="navbar">
        <img src={logo} alt="LCCB Logo" className="logo" />
        <h1 className="site-title">LCCB - CLUBSPHERE</h1>
        <ul className="nav-links">
          <li><a href="/home" onClick={preventNavigation}>HOME</a></li>
          <li><a href="/about">ABOUT</a></li>
          
          <li>
            <a href="#" onClick={preventNavigation}>CLUBS</a>
            {/* Dropdown under CLUBS */}
            <div className="dropdowns">
              <label>SBIT:</label>
              <select onChange={handleDropdownChange}>
                <option value="IT1">IT1</option>
                <option value="IT2">IT2</option>
              </select>
              
              <label>SHTM:</label>
              <select onChange={handleDropdownChange}>
                <option value="HM1">HM1</option>
                <option value="HM2">HM2</option>
              </select>

              <label>SARFAID:</label>
              <select onChange={handleDropdownChange}>
                <option value="ACR1">ACR1</option>
                <option value="ARC2">ARC2</option>
              </select>

              <label>SSLATE:</label>
              <select onChange={handleDropdownChange}>
                <option value="SL1">SL1</option>
                <option value="SL2">SL2</option>
              </select>
            </div>
          </li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>Log out</button>
      </nav>

      <section className="main-section">
        <h2 className="upcoming-title">UPCOMING EVENTS</h2>

        {/* Event Cards */}
        <div className="event-card">
          <img src={logo} alt="Department Logo" className="event-logo" />
          <div className="event-details">
            <h3>DEPARTMENT CLUB NAME</h3>
            <h2>EVENT NAME</h2>
          </div>
          <div className="event-venue">
            <h4>VENUE</h4>
            <p>00/00/0000</p>
          </div>
        </div>
        <div className="event-card">
          <img src={logo} alt="Department Logo" className="event-logo" />
          <div className="event-details">
            <h3>DEPARTMENT CLUB NAME</h3>
            <h2>EVENT NAME</h2>
          </div>
          <div className="event-venue">
            <h4>VENUE</h4>
            <p>00/00/0000</p>
          </div>
        </div>
        <div className="event-card">
          <img src={logo} alt="Department Logo" className="event-logo" />
          <div className="event-details">
            <h3>DEPARTMENT CLUB NAME</h3>
            <h2>EVENT NAME</h2>
          </div>
          <div className="event-venue">
            <h4>VENUE</h4>
            <p>00/00/0000</p>
          </div>
        </div>
        <div className="event-card">
          <img src={logo} alt="Department Logo" className="event-logo" />
          <div className="event-details">
            <h3>DEPARTMENT CLUB NAME</h3>
            <h2>EVENT NAME</h2>
          </div>
          <div className="event-venue">
            <h4>VENUE</h4>
            <p>00/00/0000</p>
          </div>
        </div>
       
        
        
        
        
        {/* Add more event cards as needed */}
      </section>
    </div>
  );
}

export default Shome;
