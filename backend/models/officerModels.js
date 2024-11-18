const db = require('../config/database');

const Officer = {
    create: (officerData, callback) => {
        const sql = 'INSERT INTO officers (club_id, officer_fname, officer_lname, position) VALUES (?, ?, ?, ?)';
        db.query(sql, [officerData.clubId, officerData.officerFname, officerData.officerLname, officerData.position], callback);
    }
};

module.exports = Officer;
