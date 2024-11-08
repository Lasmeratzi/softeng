import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Shome.css';
import logo from './lccb.png';
import SHTMLogo from './SHTM.png';
import SBITLogo from './SBIT.png';
import SARFAIDLogo from './SARFAID.png';
import SSLATELogo from './SSLATE.png';

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
          <li><a href="/user" onClick={preventNavigation}>HOME</a></li>
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

      <section className="smain-section">
        <h2 className="upcoming-title">UPCOMING EVENTS</h2>

        <div className="sevent-cards-container">
          <div className="sevent-card sevent-card1" key={1}>
            <img src={SHTMLogo} alt="SHTM Logo" className="sevent-logo" />
            <div className="sevent-details">
              <h3>SHTM Club</h3>
              <h2>EVENT</h2>
            </div>
          </div>

          <div className="sevent-card sevent-card2" key={2}>
            <img src={SBITLogo} alt="SBIT Logo" className="sevent-logo" />
            <div className="sevent-details">
              <h3>SBIT Club</h3>
              <h2>EVENT</h2>
            </div>
          </div>

          <div className="sevent-card sevent-card3" key={3}>
            <img src={SARFAIDLogo} alt="SARFAID Logo" className="sevent-logo" />
            <div className="sevent-details">
              <h3>SARFAID Club</h3>
              <h2>EVENT</h2>
            </div>
          </div>

          <div className="sevent-card sevent-card4" key={4}>
            <img src={SSLATELogo} alt="SSLATE Logo" className="sevent-logo" />
            <div className="sevent-details">
              <h3>SSLATE Club</h3>
              <h2>EVENT</h2>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Shome;
