const fs = require('fs');
const path = require('path');
const db = require('../config/database'); // Ensure the database connection is required here

exports.addDepartment = (req, res) => {
    const departmentData = req.body;

    if (!departmentData.departmentId || !departmentData.departmentLogo || !departmentData.departmentName || !departmentData.departmentColor) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Decode the base64 image and save it
    const base64Data = departmentData.departmentLogo.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');
    const fileName = `${departmentData.departmentId}-${Date.now()}.png`;
    const filePath = path.join(__dirname, '..', 'uploads', fileName);

    fs.writeFile(filePath, buffer, (err) => {
        if (err) {
            console.error('Error saving image:', err);
            return res.status(500).json({ message: 'Error saving image', error: err });
        }

        departmentData.departmentLogo = fileName;
        const sql = 'INSERT INTO department (department_id, department_name, department_logo, department_color) VALUES (?, ?, ?, ?)';
        db.query(sql, [departmentData.departmentId, departmentData.departmentName, fileName, departmentData.departmentColor], (err, result) => {
            if (err) {
                console.error('Error adding department:', err);
                return res.status(500).json({ message: 'Error adding department', error: err });
            }
            res.status(200).json({ message: 'Department added successfully!' });
        });
    });
};

exports.getAllDepartments = (req, res) => {
    const sql = 'SELECT * FROM department';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching departments:', err);
            return res.status(500).json({ message: 'Error fetching departments', error: err });
        }
        res.json(results);
    });
};

exports.getDepartmentById = (req, res) => {
    const departmentId = req.params.id;
    const sql = 'SELECT * FROM department WHERE department_id = ?';
    db.query(sql, [departmentId], (err, results) => {
        if (err) {
            console.error('Error fetching department:', err);
            return res.status(500).json({ message: 'Error fetching department', error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.json(results[0]);
    });
};

exports.updateDepartment = (req, res) => {
    const departmentId = req.params.id;
    const departmentData = req.body;

    const sql = 'UPDATE department SET department_name = ?, department_logo = ?, department_color = ? WHERE department_id = ?';
    db.query(sql, [departmentData.departmentName, departmentData.departmentLogo, departmentData.departmentColor, departmentId], (err, result) => {
        if (err) {
            console.error('Error updating department:', err);
            return res.status(500).json({ message: 'Error updating department', error: err });
        }
        res.status(200).json({ message: 'Department updated successfully!' });
    });
};

exports.deleteDepartment = (req, res) => {
    const departmentId = req.params.id;
    const sql = 'DELETE FROM department WHERE department_id = ?';
    db.query(sql, [departmentId], (err, result) => {
        if (err) {
            console.error('Error deleting department:', err);
            return res.status(500).json({ message: 'Error deleting department', error: err });
        }
        res.status(204).json({ message: 'Department deleted successfully!' });
    });
};
