const db = require('../config/database');

const User = {
    create: (userData, callback) => {
        const sql = 'INSERT INTO user (user, email, department_id, password) VALUES (?, ?, ?, ?)';
        db.query(sql, [userData.user, userData.email, userData.department_id, userData.password], callback);
    },
    getAll: (callback) => {
        const sql = 'SELECT * FROM user';
        db.query(sql, callback);
    },
    getById: (id, callback) => {
        const sql = 'SELECT * FROM user WHERE id = ?';
        db.query(sql, [id], callback);
    },
    getByUsername: (username, callback) => {
        const sql = 'SELECT * FROM user WHERE user = ?';
        db.query(sql, [username], callback);
    },
    update: (id, userData, callback) => {
        const sql = 'UPDATE user SET user = ?, email = ?, department_id = ?, password = ? WHERE id = ?';
        db.query(sql, [userData.user, userData.email, userData.department_id, userData.password, id], callback);
    },
    delete: (id, callback) => {
        const sql = 'DELETE FROM user WHERE id = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = User;
