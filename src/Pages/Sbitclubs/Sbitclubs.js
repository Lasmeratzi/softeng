import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sbitclubs.css'; // Assuming the file is named 'Sbitclubs.css'
import logo from './lccb.png';
import SHTMLogo from './bmap 1.png';
import SBITLogo from './SIPD logo 1.png';
import SARFAIDLogo from './ayl 1.png';

function Sbitclubs() {
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
    <div className="Sbitclubs-container">
      <nav className="navbar">
        <img src={logo} alt="LCCB Logo" className="logo" />
        <h1 className="site-title">LCCB - CLUBSPHERE</h1>
        <ul className="nav-links">
          <li><a href="/user">HOME</a></li>
          <li><a href="/about">ABOUT</a></li>
          <li>
            <a href="#" onClick={preventNavigation}>CLUBS</a>
            <div className="dropdowns">
              <a href="/sbitclubs" onClick={() => navigate('/sbitclubs')}>SBIT</a>
              <a href="/Shtmclubs" onClick={() => navigate('/Shtmclubs')}>SHTM</a>
              <a href="/Sarfaidclubs" onClick={() => navigate('/sarfaidclubs')}>SARFAID</a>
              <a href="/sslate" onClick={() => navigate('/sslate')}>SSLATE</a>
            </div>
          </li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>Log out</button>
      </nav>

      <section className="main-section">
        <h2 className="upcoming-title">SBIT  CLUBS UPCOMING EVENTS</h2>

        <div className="event-cards-container">
          <div className="event-card event-card5" key={5}>
            <img src={SHTMLogo} alt="SIPD logo 1" className="event-logo" />
            <div className="event-details">
              <h3>BMAP Club</h3>
              <h2>EVENT</h2>
            </div>
          </div>

          <div className="event-card event-card6" key={6}>
            <img src={SBITLogo} alt="ayl 1.png" className="event-logo" />
            <div className="event-details">
              <h3>SIPD Club</h3>
              <h2>EVENT</h2>
            </div>
          </div>

          <div className="event-card event-card7" key={7}>
            <img src={SARFAIDLogo} alt="SARFAID Logo" className="event-logo" />
            <div className="event-details">
              <h3>AYL Club</h3>
              <h2>EVENT</h2>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sbitclubs;
