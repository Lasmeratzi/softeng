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
    eventDate: '',
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
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { eventId, clubId, eventName, eventDetails, eventVenue, eventDate } = eventData;

    if (!eventId || !clubId || !eventName || !eventDetails || !eventVenue || !eventDate) {
      alert('Please fill in all fields');
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
      fetchEvents();
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
      eventDate: event.event_date,
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
  };<h1 className="events-site-title">LCCB-CLUBSPHERE</h1>

  return (
    <div className="events-profile-container">
      <nav className="events-navbar">
  <div className="events-left-navbar">
    <img src={logo} alt="LCCB Logo" className="events-logo" />
    <ul className="events-nav-links">
    <h1 className="events-site-title">LCCB NEXUS </h1>
      <li><a href="/departments" onClick={handleNavigation('/departments')}>DEPARTMENTS</a></li>
      <li><a href="/events" onClick={handleNavigation('/events')}>EVENTS</a></li>
      <li><a href="/clubs" onClick={handleNavigation('/clubs')}>CLUBS</a></li>
    </ul>
  </div>
  <button className="events-logout-button" onClick={handleLogout}>Log out</button>
</nav>

      <div className="events-main-section33">
        <div className="events-left-section">
        <h2 className="upcoming-title22">LCCB CLUB EVENTS</h2>
          <form className="events-form" onSubmit={handleSubmit}>
          <label>Club ID</label>
            <input
              type="text"
              name="eventId"
              placeholder="Event ID"
              value={eventData.eventId}
              onChange={handleInputChange}
              className="events-input-field"
              readOnly={isUpdating}
            />
            <label>Club ID</label>
            <input
              type="text"
              name="clubId"
              placeholder="Club ID"
              value={eventData.clubId}
              onChange={handleInputChange}
              className="events-input-field"
            />
           <label>Event Name</label>
            <input
              type="text"
              name="eventName"
              placeholder="Event Name"
              value={eventData.eventName}
              onChange={handleInputChange}
              className="events-input-field"
            />
            <label>Event Details</label>
            <textarea
              name="eventDetails"
              placeholder="Event Details"
              value={eventData.eventDetails}
              onChange={handleInputChange}
              className="events-input-field"
            /> <label>Event Venue</label>
            <input
              type="text"
              name="eventVenue"
              placeholder="Event Venue"
              value={eventData.eventVenue}
              onChange={handleInputChange}
              className="events-input-field"
            />
            
            <input
              type="date"
              name="eventDate"
              value={eventData.eventDate}
              onChange={handleInputChange}
              className="events-input-field"
            />
            <button className="events-submit-button" type="submit">
              {isUpdating ? 'Update Event' : 'Add Event'}
            </button>
          </form>
        </div>
       
        <div className="events-right-section">
        <h2 className="upcoming-title22">UPCOMING EVENTS</h2>
          
          <table className="events-table">
            <thead>
              <tr><th>Event Name</th>
                <th>Event Name</th>
                <th>Details</th>
                <th>Venue</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.event_id}>
                  <td>{event.event_name}</td>
                  <td>{event.event_details}</td>
                  <td>{event.event_venue}</td>
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
