const db = require('../config/database');

const Department = {
    create: (departmentData, callback) => {
        const sql = 'INSERT INTO department (department_id, department_logo, department_name, department_color) VALUES (?, ?, ?, ?)';
        db.query(sql, [departmentData.departmentId, departmentData.departmentLogo, departmentData.departmentName, departmentData.departmentColor], callback);
    }
};

module.exports = Department;
