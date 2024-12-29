const db = require('../config/database');

const Course = {
    create: (courseData, callback) => {
        const sql = 'INSERT INTO course (department_id, course_name, course_abbrev) VALUES (?, ?, ?)';
        db.query(sql, [courseData.departmentId, courseData.courseName, courseData.courseAbbrev], callback);
    },
    getAll: (callback) => {
        const sql = 'SELECT * FROM course';
        db.query(sql, callback);
    },
    getById: (id, callback) => {
        const sql = 'SELECT * FROM course WHERE course_id = ?';
        db.query(sql, [id], callback);
    },
    update: (id, courseData, callback) => {
        const sql = 'UPDATE course SET department_id = ?, course_name = ?, course_abbrev = ? WHERE course_id = ?';
        db.query(sql, [courseData.departmentId, courseData.courseName, courseData.courseAbbrev, id], callback);
    },
    delete: (id, callback) => {
        const sql = 'DELETE FROM course WHERE course_id = ?';
        db.query(sql, [id], callback);
    },
    getByDepartment: (departmentId, callback) => {
        const sql = 'SELECT * FROM course WHERE department_id = ?';
        db.query(sql, [departmentId], callback);
    }
};

module.exports = Course;
