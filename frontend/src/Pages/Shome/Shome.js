import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Shome.css'; // Adjust the path to your CSS file
import logo from './lccblogo2.png'; // Adjust the path to your image file
import logo2 from './lolwh.png'; // Adjust the path to your image file
import logo3 from './lolblck.png'; // Adjust the path to your image file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../components/Footer/Footer'; // Adjust the path to your Footer component
import { useSpring, animated } from 'react-spring'; // Import react-spring
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS

function Shome() {
  const navigate = useNavigate();
  const location = useLocation();
  const [departments, setDepartments] = useState([]);
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departmentEvents, setDepartmentEvents] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [clubEvents, setClubEvents] = useState([]);
  const [isEventTableVisible, setIsEventTableVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false); // State for fade-out animation
  const [username, setUsername] = useState(''); // State to store the username

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('loggedIn');
    const userId = sessionStorage.getItem('user_id'); // Get user_id from session storage
    if (!loggedIn) {
      navigate('/'); // Redirect to login if not logged in
    }

    if (location.state && location.state.loggedIn) {
      showSuccessNotification();
      sessionStorage.setItem('loggedIn', true); // Set session storage on successful login
    }
    fetchUsername(userId); // Fetch username based on user_id
    fetchDepartments();
    fetchEvents();
    fetchClubs();
  }, [location.state]);

  const showSuccessNotification = () => {
    toast.success("Login successful", {
      position: "top-center",
      autoClose: 5000,
    });
  };

  const fetchUsername = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}/username`);
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

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
      setClubs(response.data);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };

  const handleCardClick = async (department) => {
    setSelectedDepartment(department);
    setSelectedClub(null); // Reset the selected club
    setClubEvents([]); // Clear club events
    setIsEventTableVisible(false); // Hide the event table
    try {
      const response = await axios.get('http://localhost:5000/api/clubs');
      const filteredClubs = response.data.filter(club => club.department_id === department.department_id);
      setClubs(filteredClubs);
    } catch (error) {
      console.error('Error fetching department clubs:', error);
    }
  };

  const fetchClubEvents = async (club) => {
    setSelectedClub(club);
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      const filteredEvents = response.data.filter(event => event.club_id === club.club_id);
      setClubEvents(filteredEvents);
      setIsEventTableVisible(true);
    } catch (error) {
      console.error('Error fetching club events:', error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('loggedIn'); // Remove session on logout
    sessionStorage.removeItem('user_id'); // Remove user_id on logout
    setIsFadingOut(true);
    setTimeout(() => {
      navigate('/');
    }, 300); // Match the duration of the animation
  };

  const preventNavigation = (e) => {
    e.preventDefault();
  };

  const fadeOutStyles = useSpring({
    opacity: isFadingOut ? 0 : 1,
    config: { duration: 300 },
  });

  return (
    <animated.div style={fadeOutStyles} className="student-home-container">
      <ToastContainer />
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
              <a href="/iclubs" onClick={() => navigate('/iclubs')}>INTEREST CLUBS</a>
            </div>
          </li>
        </ul>
        <div className="student-username-container">
          <span className="student-username">Welcome, user{username}</span>
          <button className="student-logout-button" onClick={handleLogout}>LOG OUT</button>
        </div>
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
          {selectedDepartment && (
            <div>
              <h2 className="student-upcoming-title">Clubs in {selectedDepartment.department_name}</h2>
              <div className="student-event-cards-container">
                {clubs.map(club => (
                  <div
                    className="student-event-card"
                    key={club.club_id}
                    style={{ backgroundColor: selectedDepartment.department_color }}
                  >
                    <img src={`http://localhost:5000/uploads/${club.club_logo}`} alt={`${club.club_name} Logo`} className="student-event-logo" />
                    <div className="student-event-details">
                      <h3>{club.club_name}</h3>
                      <button onClick={() => fetchClubEvents(club)} className="student-view-events-button">View Events</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {selectedClub && isEventTableVisible && (
            <section className="student-events-section">
              <h2 className="student-upcoming-title2">Events of {selectedClub.club_name}</h2>
              <table className="events-table2">
                <tbody>
                  {clubEvents.map(event => (
                    <tr key={event.event_id}>
                      <td>{event.event_name}</td>
                      <td>{event.event_date ? new Date(event.event_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </div>
        <div className="student-right-section">
          <h2 className="student-upcoming-title4">Academic Year 2024-2025</h2>
          <table className="student-clubs-table">
            <thead>
            </thead>
            <tbody>
              {clubs.map(club => (
                <tr key={club.club_id}>
                  <td><img src={`http://localhost:5000/uploads/${club.club_logo}`} alt={`${club.club_name} Logo`} className="student-club-logo" /></td>
                  <td>
                    {club.club_name}
                    <br />
                    <span style={{ fontSize: '14px' }}>{club.course_abbrev}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Footer /> {/* Add Footer component here */}
    </animated.div>
  );
}

export default Shome;
