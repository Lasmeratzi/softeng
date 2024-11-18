const db = require('../config/database');

const Club = {
    create: (clubData, callback) => {
        const sql = 'INSERT INTO clubs (department_id, club_logo, club_name, club_color) VALUES (?, ?, ?, ?)';
db.query(sql, [clubData.departmentId, clubData.clubLogo, clubData.clubName, clubData.clubColor], callback);

    }
};

module.exports = Club;
