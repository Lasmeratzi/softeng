const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');

// Route to add a new club
router.post('/clubs', clubController.addClub);

// Route to get all clubs
router.get('/clubs', clubController.getAllClubs);

// Route to get a club by ID
router.get('/clubs/:id', clubController.getClubById);

// Route to update a club by ID
router.put('/clubs/:id', clubController.updateClub);

// Route to delete a club by ID
router.delete('/clubs/:id', clubController.deleteClub);

module.exports = router;
