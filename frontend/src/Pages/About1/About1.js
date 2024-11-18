import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About1.css';
import logo from './lccblogo2.png';
import logo2 from './lolwh.png'; // Adjust the path to your image file
import logo33 from './lolblck.png'; // Adjust the path to your image file
import lccnexus from './lccnexus.jpg'; // Import the new image
import lccport from './lccport.jpg'; // Import the new image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../components/Footer/Footer'; // Import the Footer component

function About1() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const preventNavigation = (e) => {
    e.preventDefault();
  };

  return (
    <div className="student-home-container">
      <nav className="student-navbar">
        <img src={logo} alt="LCCB Logo" className="student-logo" />
        <img src={logo2} alt="LCCB Logo2" className="student-logo2" />
        <ul className="student-nav-links">
          <li><a href="/shome" onClick={() => navigate('/shome')}>HOME</a></li>
          <li><a href="/about1" onClick={() => navigate('/about1')}>ABOUT</a></li>
          <li>
            <a href="#" onClick={preventNavigation}>CLUBS</a>
            <FontAwesomeIcon icon={faCaretDown} className="dropdown-icon" />
            <div className="student-dropdowns">
              <a href="/sbitclubs" onClick={() => navigate('/sbitclubs')}>SBIT</a>
              <a href="/shtmclubs" onClick={() => navigate('/shtmclubs')}>SHTM</a>
              <a href="/sarfaidclubs" onClick={() => navigate('/sarfaidclubs')}>SARFAID</a>
              <a href="/sslate" onClick={() => navigate('/sslate')}>SSLATE</a>
            </div>
          </li>
        </ul>
        <button className="student-logout-button" onClick={handleLogout}>LOG OUT</button>
      </nav>

      <img src={lccnexus} alt="LCC Nexus" className="lccnexus-image" /> {/* Add the new image here */}
      
      <div className="about-container">
        <h1 className="about-title">LCCB
        <img src={logo33} alt="LCCB Logo33" className="student-logo33" />
        NEXUS
        </h1>
        <div className="about-content">
          <div className="about-text-container">
            <p className="about-text">
              Welcome to Nexus, the official system for managing clubs and events for the college students of 
              La Consolacion College Bacolod (LCCB). Established in 1919 by the Augustinian Sisters from Spain, 
              under the leadership of Mo. Rita Barcelo, OSA and Mo. Consuelo, OSA, LCCB has a rich history 
              deeply connected to the Catholic Church.
            </p>
            <p className="about-text">
              The first school building was located beside the historic San Sebastian Cathedral. When Bacolod 
              became a diocese, the school was transferred to the Gonzaga property, which remains the campus' 
              home to this day. This transition allowed LCCB to expand and develop its facilities, fostering 
              a vibrant educational community.
            </p>
            <p className="about-text">
              Over the decades, La Consolacion College Bacolod has continued to shape the minds and futures of 
              its students, contributing to the rich cultural and educational landscape of Bacolod City, the 
              capital of Negros Occidental, Philippines. Today, LCCB stands as a beacon of learning, 
              nurturing students to become leaders in their respective fields.
            </p>
            <p className="about-text">
              Through Nexus, we aim to support this legacy by encouraging student involvement 
              in extracurricular activities and enriching their educational experience. Explore the clubs, 
              participate in upcoming events, and join us in continuing the tradition of excellence that began 
              more than a century ago.
            </p>
          </div>
          <div className="about-image-container">
            <img src={lccport} alt="LCC Port" className="lccport-image" />
          </div>
        </div>
        <div className="additional-content">
          <h1 className="about-title2">EXPLORE</h1>
          <p className="additional-text">
            You have a friend from another department? Check their department, maybe that friend of yours is 
            secretly a President of a club! Discover the various clubs and departments, and see what they have 
            to offer. Participation in clubs can enrich your college experience, help you make new friends, and 
            develop new skills.
          </p>
        </div>
        <div className="fun-content">
          <h1 className="about-title2">HAVE FUN</h1>
          <p className="fun-text">
            College life is not just about studying; it's also about creating memorable experiences. Engage in 
            events, join clubs, and participate in various activities to make the most out of your time here. 
            Whether it's a sports fest, cultural event, or a simple get-together with friends, these moments will 
            be the highlight of your college journey. So, get out there, have fun, and make lasting memories!
          </p>
        </div>
      </div>
      <Footer /> {/* Add Footer component here */}
    </div>
  );
}

export default About1;
