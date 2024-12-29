const db = require('../config/database');

const Club = {
    create: (clubData, callback) => {
        const sql = 'INSERT INTO clubs (department_id, club_logo, club_name, club_color, course_abbrev) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [clubData.departmentId, clubData.clubLogo, clubData.clubName, clubData.clubColor, clubData.courseAbbrev], callback);
    },
    
    getByDepartment: (departmentId, callback) => {
        const sql = 'SELECT * FROM clubs WHERE department_id = ?';
        db.query(sql, [departmentId], callback);
    },
    getAll: (callback) => {
        const sql = 'SELECT * FROM clubs';
        db.query(sql, callback);
    },
    getById: (id, callback) => {
        const sql = 'SELECT * FROM clubs WHERE club_id = ?';
        db.query(sql, [id], callback);
    },
    update: (id, clubData, callback) => {
        const sql = 'UPDATE clubs SET department_id = ?, club_logo = ?, club_name = ?, club_color = ?, course_abbrev = ? WHERE club_id = ?';
        db.query(sql, [clubData.departmentId, clubData.clubLogo, clubData.clubName, clubData.clubColor, clubData.courseAbbrev, id], callback);
    },
    delete: (id, callback) => {
        const sql = 'DELETE FROM clubs WHERE club_id = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = Club;
