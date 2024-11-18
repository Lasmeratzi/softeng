const db = require('../config/database');
const Officer = require('../models/officerModels');

// Controller to add a new officer
exports.addOfficer = (req, res) => {
    const officerData = req.body;

    // Validate that the required fields are present
    if (!officerData.clubId || !officerData.officerFname || !officerData.officerLname || !officerData.position) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create the officer entry in the database
    Officer.create(officerData, (err, result) => {
        if (err) {
            console.error('Error adding officer:', err);
            return res.status(500).json({ message: 'Error adding officer', error: err });
        }
        res.status(200).json({ message: 'Officer added successfully!' });
    });
};

// Controller to fetch all officers
exports.getAllOfficers = (req, res) => {
    const sql = 'SELECT * FROM officers';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching officers:', err);
            return res.status(500).json({ message: 'Error fetching officers', error: err });
        }
        res.json(results);
    });
};

// Controller to fetch a single officer by ID
exports.getOfficerById = (req, res) => {
    const officerId = req.params.id;
    const sql = 'SELECT * FROM officers WHERE officer_id = ?';
    db.query(sql, [officerId], (err, results) => {
        if (err) {
            console.error('Error fetching officer:', err);
            return res.status(500).json({ message: 'Error fetching officer', error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Officer not found' });
        }
        res.json(results[0]);
    });
};

// Controller to update an existing officer
exports.updateOfficer = (req, res) => {
    const officerId = req.params.id;
    const officerData = req.body;

    // Ensure all fields to be updated are present
    const sql = 'UPDATE officers SET club_id = ?, officer_fname = ?, officer_lname = ?, position = ? WHERE officer_id = ?';
    db.query(sql, [officerData.clubId, officerData.officerFname, officerData.officerLname, officerData.position, officerId], (err, result) => {
        if (err) {
            console.error('Error updating officer:', err);
            return res.status(500).json({ message: 'Error updating officer', error: err });
        }
        res.status(200).json({ message: 'Officer updated successfully!' });
    });
};

// Controller to delete an officer by ID
exports.deleteOfficer = (req, res) => {
    const officerId = req.params.id;
    const sql = 'DELETE FROM officers WHERE officer_id = ?';
    db.query(sql, [officerId], (err, result) => {
        if (err) {
            console.error('Error deleting officer:', err);
            return res.status(500).json({ message: 'Error deleting officer', error: err });
        }
        res.status(204).json({ message: 'Officer deleted successfully!' });
    });
};
