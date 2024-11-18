import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Shome.css'; // Adjust the path to your CSS file
import logo from './lccblogo2.png'; // Adjust the path to your image file
import logo2 from './lolwh.png'; // Adjust the path to your image file
import logo3 from './lolblck.png'; // Adjust the path to your image file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../components/Footer/Footer'; // Adjust the path to your Footer component

function Shome() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departmentEvents, setDepartmentEvents] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [officers, setOfficers] = useState([]);
  const [isEventTableVisible, setIsEventTableVisible] = useState(false);

  useEffect(() => {
    fetchDepartments();
    fetchEvents();
    fetchClubs();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/departments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
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

  const fetchClubs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/clubs');
      setClubs(response.data.slice(-3)); // Get the 3 most recently added clubs
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };

  const handleCardClick = async (department) => {
    setSelectedDepartment(department);
    try {
      const response = await axios.get('http://localhost:5000/api/clubs');
      const filteredClubs = response.data.filter(club => club.department_id === department.department_id);
      
      const clubIds = filteredClubs.map(club => club.club_id);

      const eventsResponse = await axios.get('http://localhost:5000/api/events');
      const filteredEvents = eventsResponse.data.filter(event => clubIds.includes(event.club_id));

      // Fill the remaining rows with empty data to make up 5 rows
      const filledEvents = [...filteredEvents];
      while (filledEvents.length < 5) {
        filledEvents.push({ event_id: `empty-${filledEvents.length}`, event_name: '', event_date: '', event_venue: '' });
      }

      setDepartmentEvents(filledEvents);
      setIsEventTableVisible(true);
    } catch (error) {
      console.error('Error fetching department events:', error);
    }
  };

  const fetchOfficers = async (clubId) => {
    try {
      const response = await axios.get('http://localhost:5000/api/officers');
      const filteredOfficers = response.data.filter(officer => officer.club_id === clubId);
      setOfficers(filteredOfficers);
    } catch (error) {
      console.error('Error fetching officers:', error);
    }
  };

  const handleClubClick = (club) => {
    setSelectedClub(club);
    fetchOfficers(club.club_id);
  };

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

      <section className="student-main-section">
        <div className="student-left-section">
          <h2 className="student-upcoming-title1">LCCB
          <img src={logo3} alt="LCCB Logo3" className="student-logo3" />
          NEXUS
          </h2>
          <table className="student-events-table">
            <tbody>
              {events.map(event => (
                <tr key={event.event_id}>
                  <td className="event-name">{event.event_name}<br /><span className="event-date">{new Date(event.event_date).toLocaleString('en-US', { month: 'short', day: 'numeric' })}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="student-center-section">
          <div className="student-title-box">
            <h2 className="student-upcoming-title">COLLEGE DEPARTMENTS</h2>
          </div>
          <div className="student-event-cards-container">
            {departments.map(department => (
              <div
                className="student-event-card"
                key={department.department_id}
                style={{ backgroundColor: department.department_color }}
                onClick={() => handleCardClick(department)}
              >
                <img src={`http://localhost:5000/uploads/${department.department_logo}`} alt={`${department.department_name} Logo`} className="student-event-logo" />
                <div className="student-event-details">
                  <h3>{department.department_name}</h3>
                </div>
              </div>
            ))}
          </div>
          <section className="student-events-section">
            <h2 className="student-upcoming-title2">Club Events From {selectedDepartment ? selectedDepartment.department_name : "Selected Department"}</h2>
            <table className="events-table2">
              <tbody>
              {departmentEvents.map(event => (
                  <tr key={event.event_id}>
                    <td>{event.event_name}</td>
                    <td>{event.event_date ? new Date(event.event_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) : ''}</td>
                    <td>{event.event_venue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
        <div className="student-right-section">
          <h2 className="student-upcoming-title3">Recently Added Clubs</h2>
          <h2 className="student-upcoming-title4">Academic Year 2024-2025</h2>
          <table className="student-clubs-table">
            <thead>
            </thead>
            <tbody>
              {clubs.map(club => (
                <tr key={club.club_id}>
                  <td><img src={`http://localhost:5000/uploads/${club.club_logo}`} alt={`${club.club_name} Logo`} className="student-club-logo" /></td>
                  <td>{club.club_name}</td>
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

export default Shome;
