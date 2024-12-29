const fs = require('fs');
const path = require('path');
const db = require('../config/database');
const Club = require('../models/clubModels');

// Controller to add a new club
exports.addClub = (req, res) => {
    const clubData = req.body;

    // Validate that the required fields are present
    if (!clubData.departmentId || !clubData.clubLogo || !clubData.clubName || !clubData.clubColor) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Decode the base64 image and save it
    const base64Data = clubData.clubLogo.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');
    const fileName = `${Date.now()}.png`; // Unique filename based on timestamp
    const filePath = path.join(__dirname, '..', 'uploads', fileName);

    fs.writeFile(filePath, buffer, (err) => {
        if (err) {
            console.error('Error saving image:', err);
            return res.status(500).json({ message: 'Error saving image', error: err });
        }

        // Update clubLogo field with the file path in the clubData object
        clubData.clubLogo = fileName;

        // Create the club entry in the database
        Club.create(clubData, (err, result) => {
            if (err) {
                console.error('Error adding club:', err);
                return res.status(500).json({ message: 'Error adding club', error: err });
            }
            res.status(200).json({ message: 'Club added successfully!' });
        });
    });
};

// Controller to fetch all clubs
exports.getAllClubs = (req, res) => {
    Club.getAll((err, results) => {
        if (err) {
            console.error('Error fetching clubs:', err);
            return res.status(500).json({ message: 'Error fetching clubs', error: err });
        }
        res.json(results);
    });
};

// Controller to fetch a single club by ID
exports.getClubById = (req, res) => {
    const clubId = req.params.id;
    Club.getById(clubId, (err, results) => {
        if (err) {
            console.error('Error fetching club:', err);
            return res.status(500).json({ message: 'Error fetching club', error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Club not found' });
        }
        res.json(results[0]);
    });
};

// Controller to update an existing club
exports.updateClub = (req, res) => {
    const clubId = req.params.id;
    const clubData = req.body;

    // Ensure all fields to be updated are present
    const sql = 'UPDATE clubs SET department_id = ?, club_logo = ?, club_name = ?, club_color = ? WHERE club_id = ?';
    db.query(sql, [clubData.departmentId, clubData.clubLogo, clubData.clubName, clubData.clubColor, clubId], (err, result) => {
        if (err) {
            console.error('Error updating club:', err);
            return res.status(500).json({ message: 'Error updating club', error: err });
        }
        res.status(200).json({ message: 'Club updated successfully!' });
    });
};

// Controller to delete a club by ID
exports.deleteClub = (req, res) => {
    const clubId = req.params.id;
    Club.delete(clubId, (err, result) => {
        if (err) {
            console.error('Error deleting club:', err);
            return res.status(500).json({ message: 'Error deleting club', error: err });
        }
        res.status(204).json({ message: 'Club deleted successfully!' });
    });
};
// Controller to get clubs by department ID
exports.getClubsByDepartment = (req, res) => {
    const { departmentId } = req.params;
    Club.getByDepartment(departmentId, (err, results) => {
      if (err) {
        console.error('Error fetching clubs by department:', err);
        return res.status(500).json({ message: 'Error fetching clubs', error: err });
      }
      res.json(results);
    });
  };
  