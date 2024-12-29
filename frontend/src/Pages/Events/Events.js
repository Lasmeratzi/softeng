import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Events.css';
import logo from './lccb.png';

function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState('');
  const [eventData, setEventData] = useState({
    eventId: '',
    clubId: '',
    eventName: '',
    eventDetails: '',
    eventPost: '',
    eventDate: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchClubs();
  }, []);

  useEffect(() => {
    if (selectedClub) {
      fetchEvents(selectedClub);
    } else {
      setEvents([]); // Clear events if no club is selected
    }
  }, [selectedClub]);

  const fetchEvents = async (clubId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/events?clubId=${clubId}`);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { clubId, eventName, eventDetails, eventDate } = eventData;

    if (!clubId || !eventName || !eventDetails || !eventDate || !file) {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('clubId', clubId);
    formData.append('eventName', eventName);
    formData.append('eventDetails', eventDetails);
    formData.append('eventDate', eventDate);
    formData.append('eventPost', file);

    try {
      if (isUpdating) {
        await axios.put(`http://localhost:5000/api/events/${eventData.eventId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Event updated successfully!');
        setIsUpdating(false);
      } else {
        await axios.post('http://localhost:5000/api/events', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Event added successfully!');
      }
      setEventData({ eventId: '', clubId: '', eventName: '', eventDetails: '', eventPost: '', eventDate: '' });
      setFile(null);
      fetchEvents(selectedClub);
    } catch (error) {
      console.error('Error:', error);
      alert(`There was an error ${isUpdating ? 'updating' : 'adding'} the event.`);
    }
  };

  const handleUpdate = (event) => {
    setEventData({
      eventId: event.event_id,
      clubId: event.club_id,
      eventName: event.event_name,
      eventDetails: event.event_details,
      eventPost: event.event_post,
      eventDate: event.event_date,
    });
    setIsUpdating(true);
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${eventId}`);
        alert('Event deleted successfully!');
        fetchEvents(selectedClub);
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('There was an error deleting the event.');
      }
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleNavigation = (path) => (e) => {
    e.preventDefault();
    navigate(path);
  };

  const truncateEventDetails = (details) => {
    const words = details.split(' ');
    if (words.length > 5) {
      return words.slice(0, 5).join(' ') + '...';
    }
    return details;
  };

  return (
    <div className="events-profile-container">
      <nav className="events-navbar">
        <div className="events-left-navbar">
          <img src={logo} alt="LCCB Logo" className="events-logo" />
          <ul className="events-nav-links">
            <h1 className="events-site-title">LCCB NEXUS</h1>
            <li><a href="/events" onClick={handleNavigation('/events')}>EVENTS</a></li>
            <li><a href="/officers" onClick={handleNavigation('/officers')}>OFFICERS</a></li>
          </ul>
        </div>
        <button className="events-logout-button" onClick={handleLogout}>Log out</button>
      </nav>

      <div className="events-main-section33">
        <div className="events-left-section">
          <h2 className="upcoming-title22">LCCB CLUB EVENTS</h2>
          <form className="events-form" onSubmit={handleSubmit}>
            <div className="events-form-row">
              <div className="events-form-column">
                <label>Club ID</label>
                <select
                  name="clubId"
                  value={eventData.clubId}
                  onChange={handleInputChange}
                  className="events-input-field"
                >
                  <option value="">Select Club</option>
                  {clubs.map(club => (
                    <option key={club.club_id} value={club.club_id}>{club.club_name}</option>
                  ))}
                </select>
              </div>
              <div className="events-form-column">
                <label>Event Name</label>
                <input
                  type="text"
                  name="eventName"
                  placeholder="Event Name"
                  value={eventData.eventName}
                  onChange={handleInputChange}
                  className="events-input-field"
                />
              </div>
            </div>
            <div className="events-form-row">
              <div className="events-form-column">
                <label>Event Details</label>
                <textarea
                  name="eventDetails"
                  placeholder="Event Details"
                  value={eventData.eventDetails}
                  onChange={handleInputChange}
                  className="events-input-field"
                />
              </div>
              <div className="events-form-column">
                <label>Event Post</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="events-input-field"
                />
              </div>
            </div>
            <div className="events-form-row">
              <div className="events-form-column">
                <label>Date</label>
                <input
                  type="date"
                  name="eventDate"
                  value={eventData.eventDate}
                  onChange={handleInputChange}
                  className="events-input-field"
                />
              </div>
            </div>
            <button className="events-submit-button" type="submit">
              {isUpdating ? 'Update Event' : 'Add Event'}
            </button>
          </form>
        </div>

        <div className="events-right-section">
          <h2 className="upcoming-title22">UPCOMING EVENTS</h2>
          <div className="events-filter-section">
            <div className="events-form-row">
              <div className="events-form-column">
                <label>Club</label>
                <select
                  name="selectedClub"
                  value={selectedClub}
                  onChange={(e) => setSelectedClub(e.target.value)}
                  className="events-input-field"
                >
                  <option value="">Select Club</option>
                  {clubs.map(club => (
                    <option key={club.club_id} value={club.club_id}>{club.club_name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <table className="events-table">
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Event Name</th>
                <th>Details</th>
                <th>Post</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events
                .filter((event) => event.club_id === Number(selectedClub))
                .map((event) => (
                  <tr key={event.event_id}>
                    <td>{event.event_id}</td>
                    <td>{event.event_name}</td>
                    <td>{truncateEventDetails(event.event_details)}</td>
                    <td><img src={`http://localhost:5000/uploads/${event.event_post}`} alt="Event Post" width="50" /></td>
                    <td>{event.event_date}</td>
                    <td>
                      <button
                        className="events-update-button"
                        onClick={() => handleUpdate(event)}
                      >
                        Update
                      </button>
                      <button
                        className="events-delete-button"
                        onClick={() => handleDelete(event.event_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Events;
