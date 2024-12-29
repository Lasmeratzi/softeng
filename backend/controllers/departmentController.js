const fs = require('fs');
const path = require('path');
const Department = require('../models/departmentModels');

exports.addDepartment = (req, res) => {
    const departmentData = req.body;

    if (!departmentData.departmentLogo || !departmentData.departmentName || !departmentData.courseCount || !departmentData.departmentColor) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Decode the base64 image and save it
    const base64Data = departmentData.departmentLogo.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');
    const fileName = `${Date.now()}.png`;
    const filePath = path.join(__dirname, '..', 'uploads', fileName);

    fs.writeFile(filePath, buffer, (err) => {
        if (err) {
            console.error('Error saving image:', err);
            return res.status(500).json({ message: 'Error saving image', error: err });
        }

        departmentData.departmentLogo = fileName;
        Department.create(departmentData, (err, result) => {
            if (err) {
                console.error('Error adding department:', err);
                return res.status(500).json({ message: 'Error adding department', error: err });
            }
            res.status(200).json({ message: 'Department added successfully!', id: result.insertId });
        });
    });
};

exports.getAllDepartments = (req, res) => {
    Department.getAll((err, results) => {
        if (err) {
            console.error('Error fetching departments:', err);
            return res.status(500).json({ message: 'Error fetching departments', error: err });
        }
        res.json(results);
    });
};

exports.getDepartmentById = (req, res) => {
    const departmentId = req.params.id;
    console.log(`Fetching department with ID: ${departmentId}`);
    // Mock data for testing
    if (departmentId == '14') {
        const mockDepartment = {
            department_id: 14,
            department_name: 'Mock Department',
            department_logo: 'mocklogo.png',
            department_color: '#ff5733',
        };
        console.log('Department fetched:', mockDepartment);
        return res.json(mockDepartment);
    }

    Department.getById(departmentId, (err, results) => {
        if (err) {
            console.error('Error fetching department:', err);
            return res.status(500).json({ message: 'Error fetching department', error: err });
        }
        if (results.length === 0) {
            console.log('Department not found');
            return res.status(404).json({ message: 'Department not found' });
        }
        console.log('Department fetched:', results[0]);
        res.json(results[0]);
    });
};


exports.updateDepartment = (req, res) => {
    const departmentId = req.params.id;
    const departmentData = req.body;

    Department.update(departmentId, departmentData, (err, result) => {
        if (err) {
            console.error('Error updating department:', err);
            return res.status(500).json({ message: 'Error updating department', error: err });
        }
        res.status(200).json({ message: 'Department updated successfully!' });
    });
};

exports.deleteDepartment = (req, res) => {
    const departmentId = req.params.id;

    Department.delete(departmentId, (err, result) => {
        if (err) {
            console.error('Error deleting department:', err);
            return res.status(500).json({ message: 'Error deleting department', error: err });
        }
        res.status(204).json({ message: 'Department deleted successfully!' });
    });
};
