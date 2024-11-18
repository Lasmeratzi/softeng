const express = require('express');
const router = express.Router();
const officerController = require('../controllers/officerController');

// Routes for officers
router.post('/officers', officerController.addOfficer);
router.get('/officers', officerController.getAllOfficers);
router.get('/officers/:id', officerController.getOfficerById);
router.put('/officers/:id', officerController.updateOfficer);
router.delete('/officers/:id', officerController.deleteOfficer);

module.exports = router;
