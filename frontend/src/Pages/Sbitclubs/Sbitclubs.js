import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sbitclubs.css'; // Adjust the path to your CSS file
import logo from './lccblogo2.png'; // Adjust the path to your image file
import logo2 from './lolwh.png'; // Adjust the path to your image file
import logo3 from './lolblck.png'; // Adjust the path to your image file
import logo4 from './SBIT.png'; // Adjust the path to your image file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../components/Footer/Footer'; // Adjust the path to your Footer component

function Sbitclubs({ departmentId }) {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [officers, setOfficers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchClubs();
    fetchEvents();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/clubs');
      const filteredClubs = response.data.filter(club => club.department_id === departmentId);
      setClubs(filteredClubs);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchOfficers = async (clubId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/officers`);
      const filteredOfficers = response.data.filter(officer => officer.club_id === clubId);
      setOfficers(filteredOfficers);
    } catch (error) {
      console.error('Error fetching officers:', error);
    }
  };

  const handleCardClick = (club) => {
    setSelectedClub(club);
    fetchOfficers(club.club_id);
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const preventNavigation = (e) => {
    e.preventDefault();
  };

  // Function to filter events based on selected club
  const getClubEvents = () => {
    if (selectedClub) {
      const filteredEvents = events.filter(event => event.club_id === selectedClub.club_id);
      const filledEvents = [...filteredEvents];
      while (filledEvents.length < 5) {
        filledEvents.push({ event_id: `empty-${filledEvents.length}`, event_name: '', event_date: '', event_venue: '' });
      }
      return filledEvents;
    }
    return [];
  };

  return (
    <div className="sbitclubs-container">
      <nav className="sbitclubs-navbar">
        <img src={logo} alt="LCCB Logo" className="sbitclubs-logo" />
        <img src={logo2} alt="LCCB Logo2" className="sbitclubs-logo2" />
        <ul className="sbitclubs-nav-links">
          <li><a href="/shome" onClick={() => navigate('/shome')}>HOME</a></li>
          <li><a href="/about1" onClick={() => navigate('/about1')}>ABOUT</a></li>
          <li>
            <a href="#" onClick={preventNavigation}>CLUBS</a>
            <FontAwesomeIcon icon={faCaretDown} className="dropdown-icon" />
            <div className="sbitclubs-dropdowns">
              <a href="/sbitclubs" onClick={() => navigate('/sbitclubs')}>SBIT</a>
              <a href="/shtmclubs" onClick={() => navigate('/shtmclubs')}>SHTM</a>
              <a href="/sarfaidclubs" onClick={() => navigate('/sarfaidclubs')}>SARFAID</a>
              <a href="/sslate" onClick={() => navigate('/sslate')}>SSLATE</a>
            </div>
          </li>
        </ul>
        <button className="sbitclubs-logout-button" onClick={handleLogout}>LOG OUT</button>
      </nav>

      <section className="sbitclubs-main-section">
        <div className="sbitclubs-left-section">
          <div className="sbitclubs-department-card">
          <img src={logo4} alt="LCCB Logo4" className="sbitclubs-logo4" />
          </div>

          <div className="sbitclubs-info-section">
            <h3 className="sbitclubs-info-title">SCHOOL OF BUSINESS AND INFORMATION TECHNOLOGY</h3>
            <p className="sbitclubs-info-body">
              The School of Business and Information Technology is geared to lead the students to become not only academically innovative but also equipped with competent skills and essential characteristics to keep up and face the challenges in this ever changing world.
            </p>
          </div>
        </div>
        <div className="sbitclubs-center-section">
          <h1 className="sbitclubs-upcoming-title">SBIT CLUBS
            <img src={logo3} alt="LCCB Logo3" className="sbitclubs-logo3" />
            AY 24-25
          </h1>
          <div className="sbitclubs-event-cards-container">
            {clubs.map(club => (
              <div className="sbitclubs-event-card" key={club.club_id} style={{ backgroundColor: club.club_color }} onClick={() => handleCardClick(club)}>
                <img src={`http://localhost:5000/uploads/${club.club_logo}`} alt={`${club.club_name} Logo`} className="sbitclubs-event-logo" />
                <div className="sbitclubs-event-details">
                  <h3>{club.club_name}</h3>
                </div>
              </div>
            ))}
          </div>
          <h2 className="sbitclubs-events-table-title">Club Events From {selectedClub ? selectedClub.club_name : "Selected Club"}</h2>
          <table className="sbitclubs-events-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Event Date</th>
                <th>Event Venue</th>
              </tr>
            </thead>
            <tbody>
              {getClubEvents().map(event => (
                <tr key={event.event_id}>
                  <td>{event.event_name}</td>
                  <td>{event.event_date ? new Date(event.event_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) : ''}</td>
                  <td>{event.event_venue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="sbitclubs-right-section">
          <h2 className="sbitclubs-officers-title">Club Officers of</h2>
          {selectedClub && (
            <h3 className="sbitclubs-selected-club-name">{selectedClub.club_name}</h3>
          )}
          <table className="sbitclubs-officers-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              {officers.map(officer => (
                <tr key={officer.officer_id}>
                  <td>{officer.officer_fname} {officer.officer_lname}</td>
                  <td>{officer.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Footer /> {/* Add Footer component here */}
    </div>
  );
}

export default Sbitclubs;