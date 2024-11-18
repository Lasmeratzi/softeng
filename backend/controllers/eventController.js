const fs = require('fs');
const path = require('path');
const db = require('../config/database');
const Event = require('../models/eventModels');

// Controller to add a new event
exports.addEvent = (req, res) => {
    const eventData = req.body;

    // Validate that the required fields are present
    if (!eventData.clubId || !eventData.eventName || !eventData.eventDetails || !eventData.eventVenue || !eventData.eventDate) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create the event entry in the database
    Event.create(eventData, (err, result) => {
        if (err) {
            console.error('Error adding event:', err);
            return res.status(500).json({ message: 'Error adding event', error: err });
        }
        res.status(200).json({ message: 'Event added successfully!' });
    });
};

// Controller to fetch all events
exports.getAllEvents = (req, res) => {
    const sql = 'SELECT * FROM events';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching events:', err);
            return res.status(500).json({ message: 'Error fetching events', error: err });
        }
        res.json(results);
    });
};

// Controller to fetch a single event by ID
exports.getEventById = (req, res) => {
    const eventId = req.params.id;
    const sql = 'SELECT * FROM events WHERE event_id = ?';
    db.query(sql, [eventId], (err, results) => {
        if (err) {
            console.error('Error fetching event:', err);
            return res.status(500).json({ message: 'Error fetching event', error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(results[0]);
    });
};

// Controller to update an existing event
exports.updateEvent = (req, res) => {
    const eventId = req.params.id;
    const eventData = req.body;

    // Ensure all fields to be updated are present
    const sql = 'UPDATE events SET club_id = ?, event_name = ?, event_details = ?, event_venue = ?, event_date = ? WHERE event_id = ?';
    db.query(sql, [eventData.clubId, eventData.eventName, eventData.eventDetails, eventData.eventVenue, eventData.eventDate, eventId], (err, result) => {
        if (err) {
            console.error('Error updating event:', err);
            return res.status(500).json({ message: 'Error updating event', error: err });
        }
        res.status(200).json({ message: 'Event updated successfully!' });
    });
};

// Controller to delete an event by ID
exports.deleteEvent = (req, res) => {
    const eventId = req.params.id;
    const sql = 'DELETE FROM events WHERE event_id = ?';
    db.query(sql, [eventId], (err, result) => {
        if (err) {
            console.error('Error deleting event:', err);
            return res.status(500).json({ message: 'Error deleting event', error: err });
        }
        res.status(204).json({ message: 'Event deleted successfully!' });
    });
};
