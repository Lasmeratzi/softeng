const db = require('../config/database');

const Event = {
    create: (eventData, callback) => {
        const sql = 'INSERT INTO events (club_id, event_name, event_details, event_venue, event_date) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [eventData.clubId, eventData.eventName, eventData.eventDetails, eventData.eventVenue, eventData.eventDate], callback);
    }
};

module.exports = Event;
