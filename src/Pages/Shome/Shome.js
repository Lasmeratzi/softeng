import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Shome.css';
import logo from './lccb.png';  

function Shome() {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false); 

  const handleLogout = () => {
    navigate('/');
  };

  const preventNavigation = (e) => {
    e.preventDefault(); 
  };

  return (
    <div className="shome-container">
      <nav className="navbar">
        <img src={logo} alt="LCCB Logo" className="logo" />
        <h1 className="site-title">LCCB - CLUBSPHERE</h1>
        <ul className="nav-links">
          <li><a href="/home" onClick={preventNavigation}>HOME</a></li>
          <li><a href="#">ABOUT</a></li>
          <li><a href="#">SSG</a></li>
          <li 
            onMouseEnter={() => setDropdownOpen(true)} 
            onMouseLeave={() => setDropdownOpen(false)}
            className="dropdown-container"
          >
            <a href="#" onClick={preventNavigation}>CLUBS</a>
            {isDropdownOpen && (
              <ul className="dropdown">
                <li><a href="#" className="dropdown-item">SBIT</a></li>
                <li><a href="#" className="dropdown-item">SHTM</a></li>
                <li><a href="#" className="dropdown-item">SARFAID</a></li>
                <li><a href="#" className="dropdown-item">SSLATE</a></li>
              </ul>
            )}
          </li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>Log out</button>
      </nav>

      <section className="main-section">
        <h2 className="upcoming-title">UPCOMING EVENTS</h2>

        {/* Event Card 1 */}
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

        {/* Event Card 2 */}
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

        {/* Event Card 3 */}
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

        {/* Event Card 4 */}
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
      </section>
    </div>
  );
}

export default Shome;
