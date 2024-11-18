import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sarfaidclubs.css'; // Assuming the file is named 'Sarfaid clubs.css'
import logo from './lccb.png';
import SHTMLogo from './uapsa 1.png';
import SBITLogo from './id 1.png';
import SARFAIDLogo from './af 1.png';

function Sarfaidclubs() {
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
    <div className="Sarfaid-container">
      <nav className="navbar">
        <img src={logo} alt="LCCB Logo" className="logo" />
        <h1 className="site-title">LCCB - CLUBSPHERE</h1>
        <ul className="nav-links">
        <li><a href="/shome" onClick={() => navigate('/shome')}>HOME</a></li>
        <li><a href="/about1" onClick={() => navigate('/about1')}>ABOUT</a></li>
          <li>
            <a href="#" onClick={preventNavigation}>CLUBS</a>
            <div className="dropdowns">
              <a href="/sbitclubs" onClick={() => navigate('/sbitclubs')}>SBIT</a>
              <a href="/Shtmclubs" onClick={() => navigate('/Shtmclubs')}>SHTM</a>
              <a href="/Sarfaidclubs" onClick={() => navigate('/arfaidclubs')}>SARFAID</a>
              <a href="/sslate" onClick={() => navigate('/sslate')}>SSLATE</a>
            </div>
          </li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>Log out</button>
      </nav>

      <section className="fmain-section">
        <h2 className="upcoming-title">SARFAID   CLUBS UPCOMING EVENTS</h2>

        <div className="fevent-cards-container">
          <div className="fevent-card fevent-card5" key={8}>
            <img src={SHTMLogo} alt="uapsa 1" className="fevent-logo" />
            <div className="fevent-details">
              <h3>UAPSA Club</h3>
              <h2>EVENT</h2>
            </div>
          </div>

          <div className="fevent-card fevent-card6" key={9}>
            <img src={SBITLogo} alt="id 1.png" className="fevent-logo" />
            <div className="fevent-details">
              <h3>PIID-SAB Club</h3>
              <h2>EVENT</h2>
            </div>
          </div>

          <div className="fevent-card fevent-card7" key={0}>
            <img src={SARFAIDLogo} alt="SARFAID Logo" className="fevent-logo" />
            <div className="event-details">
              <h3>Artists’ Forum Club</h3>
              <h2>EVENT</h2>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sarfaidclubs;
