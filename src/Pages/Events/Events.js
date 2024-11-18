import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Events.css';
import logo from './lccb.png';

function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({
    eventId: '',
    clubId: '',
    eventName: '',
    eventDetails: '',
    eventVenue: '',
    eventDate: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { eventId, clubId, eventName, eventDetails, eventVenue, eventDate } = eventData;

    if (!eventId || !clubId || !eventName || !eventDetails || !eventVenue || !eventDate) {
      alert("Please fill in all fields");
      return;
    }

    try {
      if (isUpdating) {
        await axios.put(`http://localhost:5000/api/events/${eventId}`, eventData);
        alert('Event updated successfully!');
        setIsUpdating(false);
      } else {
        await axios.post('http://localhost:5000/api/events', eventData);
        alert('Event added successfully!');
      }
      setEventData({ eventId: '', clubId: '', eventName: '', eventDetails: '', eventVenue: '', eventDate: '' });
      fetchEvents(); // Fetch updated data after submission
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
      eventVenue: event.event_venue,
      eventDate: event.event_date
    });
    setIsUpdating(true);
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${eventId}`);
        alert('Event deleted successfully!');
        fetchEvents();
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

  return (
    <div className="events-profile-container">
      <nav className="events-navbar">
        <img src={logo} alt="LCCB Logo" className="events-logo" />
        <h1 className="events-site-title">LCCB-CLUBSPHERE</h1>
        <ul className="events-nav-links">
          <li><a href="/departments" onClick={handleNavigation('/departments')}>DEPARTMENTS</a></li>
          <li><a href="/events" onClick={handleNavigation('/events')}>EVENTS</a></li>
          <li><a href="/clubs" onClick={handleNavigation('/clubs')}>CLUBS</a></li>
        </ul>
        <button className="events-logout-button" onClick={handleLogout}>Log out</button>
      </nav>

      <div className="events-main-section">
        <div className="events-left-section">
          <h2 className="events-upcoming-title">LCCB CLUB EVENTS</h2>
          <form className="events-form" onSubmit={handleSubmit}>
            <h1>Event-ID</h1>
            <input 
              type="text" 
              name="eventId" 
              placeholder="Event ID" 
              value={eventData.eventId}
              onChange={handleInputChange}
              className="events-input-field" 
              readOnly={isUpdating} 
            />
            <h1>Club-ID</h1>
            <input 
              type="text" 
              name="clubId" 
              placeholder="Club ID" 
              value={eventData.clubId}
              onChange={handleInputChange}
              className="events-input-field" 
            />
            <h1>Event Name</h1>
            <input 
              type="text" 
              name="eventName" 
              placeholder="Event Name" 
              value={eventData.eventName}
              onChange={handleInputChange}
              className="events-input-field" 
            />
            <h1>Event Details</h1>
            <input 
              type="text" 
              name="eventDetails" 
              placeholder="Event Details" 
              value={eventData.eventDetails}
              onChange={handleInputChange}
              className="events-input-field" 
            />
            <h1>Event Venue</h1>
            <input 
              type="text" 
              name="eventVenue" 
              placeholder="Event Venue" 
              value={eventData.eventVenue}
              onChange={handleInputChange}
              className="events-input-field" 
            />
            <h1>Event Date</h1>
            <input 
              type="date" 
              name="eventDate" 
              placeholder="Event Date" 
              value={eventData.eventDate}
              onChange={handleInputChange}
              className="events-input-field" 
            />
            <button type="submit" className="events-submit-button">
              {isUpdating ? 'Update' : 'Submit'}
            </button>
          </form>
        </div>
        <div className="events-right-section">
          <h2 className="events-upcoming-title">EXISTING EVENTS</h2>
          <table className="events-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Club ID</th>
                <th>Name</th>
                <th>Details</th>
                <th>Venue</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                      {events.map(event => (
                        <tr key={event.event_id}>
                        <td>{event.event_id}</td>
                        <td>{event.club_id}</td>
                        <td>{event.event_name}</td>
                        <td>{event.event_details.length > 5 ? event.event_details.substring(0, 5) + '...' : event.event_details}</td>
                        <td>{event.event_venue}</td>
                        <td>{new Date(event.event_date).toLocaleDateString('en-US')}</td> {/* Format date */}
                        <td>
                        <button className="events-update-button" onClick={() => handleUpdate(event)}>Update</button>
                        <button className="events-delete-button" onClick={() => handleDelete(event.event_id)}>Delete</button>
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
