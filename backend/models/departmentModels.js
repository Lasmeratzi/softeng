const db = require('../config/database');

const Department = {
    create: (departmentData, callback) => {
        const sql = 'INSERT INTO department (department_logo, department_name, course_count, department_color) VALUES (?, ?, ?, ?)';
        db.query(sql, [departmentData.departmentLogo, departmentData.departmentName, departmentData.courseCount, departmentData.departmentColor], callback);
    },
    getAll: (callback) => {
        const sql = 'SELECT * FROM department';
        db.query(sql, callback);
    },
    getById: (id, callback) => {
        const sql = 'SELECT * FROM department WHERE department_id = ?';
        db.query(sql, [id], callback);
    },
    update: (id, departmentData, callback) => {
        const sql = 'UPDATE department SET department_logo = ?, department_name = ?, course_count = ?, department_color = ? WHERE department_id = ?';
        db.query(sql, [departmentData.departmentLogo, departmentData.departmentName, departmentData.courseCount, departmentData.departmentColor, id], callback);
    },
    delete: (id, callback) => {
        const sql = 'DELETE FROM department WHERE department_id = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = Department;
