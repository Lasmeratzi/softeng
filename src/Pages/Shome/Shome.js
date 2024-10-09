import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Shome.css';
import logo from './lccb.png';
import SHTMLogo from './SHTM.png';
import SBITLogo from './SBIT.png';
import SARFAIDLogo from './SARFAID.png';
import SSLATELogo from './SSLATE.png';

const clubs = [
  { name: 'SHTM', logo: SHTMLogo, key: 1 },
  { name: 'SBIT', logo: SBITLogo, key: 2 },
  { name: 'SARFAID', logo: SARFAIDLogo, key: 3 },
  { name: 'SSLATE', logo: SSLATELogo, key: 4 },
];

const Shome = () => {
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
          <li><a href="/ssg">SSG</a></li>
          <li>
            <a href="#" onClick={preventNavigation}>CLUBS</a>
            <div className="dropdowns">
              {['SBIT', 'SHTM', 'SARFAID', 'SSLATE'].map(club => (
                <div key={club}>
                  <label>{club}:</label>
                  <select onChange={handleDropdownChange}>
                    <option value="1">{club}1</option>
                    <option value="2">{club}2</option>
                  </select>
                </div>
              ))}
            </div>
          </li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>Log out</button>
      </nav>

      <section className="main-section">
        <h2 className="upcoming-title">UPCOMING EVENTS</h2>

        <div className="event-cards-container">
          {clubs.map(({ name, logo, key }) => (
            <div className={`event-card event-card${key}`} key={key}>
              <img src={logo} alt={`${name} Logo`} className="event-logo" />
              <div className="event-details">
                <h3>{name} Club</h3>
                <h2>EVENT</h2>
              </div>
              <div className="event-venue">
                <h4>Venue:</h4>
                <p>00/00/0000</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Shome;
