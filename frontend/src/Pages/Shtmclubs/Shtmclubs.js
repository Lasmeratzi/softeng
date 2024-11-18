import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Shtmclubs.css'; // Assuming the file is named 'Shtmclubs.css'
import logo from './lccb.png';
import SHTMLogo from './png-logos.png';
import SBITLogo from './logo1.png';
import SARFAIDLogo from './logos-png-8.png';

function Shtmclubs() {
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
    <div className="Shtmclubs-container">
      <nav className="navbar">
        <img src={logo} alt="LCCB Logo" className="logo" />
        <h1 className="site-title">LCCB - CLUBSPHERE</h1>
        <ul className="nav-links">
          <li><a href="/shome">HOME</a></li>
          <li><a href="/about">ABOUT</a></li>
          <li>
            <a href="#" onClick={preventNavigation}>CLUBS</a>
            <div className="dropdowns">
              <a href="/sbitclubs" onClick={() => navigate('/sbitclubs')}>SBIT</a>
              <a href="/Shtmclubs" onClick={() => navigate('/shtmclubs')}>SHTM</a>
              <a href="/Sarfaidclubs" onClick={() => navigate('/sarfaidclubs')}>SARFAID</a>
              <a href="/sslate" onClick={() => navigate('/sslate')}>SSLATE</a>
            </div>
          </li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>Log out</button>
      </nav>

      <section className="hmain-section">
        <h2 className="upcoming-title">  SHTM CLUBS UPCOMING EVENTS</h2>

        <div className="hevent-cards-container">
          <div className="hevent-card event-card5" key={11}>
            <img src={SHTMLogo} alt="png-logos.png" className="hevent-logo" />
            <div className="hevent-details">
              <h3>BMAP Club</h3>
              <h2>EVENT</h2>
            </div>
          </div>

          <div className="hevent-card hevent-card6" key={12}>
            <img src={SBITLogo} alt="logo1.png" className="hevent-logo" />
            <div className="hevent-details">
              <h3>SIPD Club</h3>
              <h2>EVENT</h2>
            </div>
          </div>

          <div className="hevent-card hevent-card7" key={13}>
            <img src={SARFAIDLogo} alt="SARFAID Logo" className="hevent-logo" />
            <div className="hevent-details">
              <h3>AYL Club</h3>
              <h2>EVENT</h2>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Shtmclubs;
