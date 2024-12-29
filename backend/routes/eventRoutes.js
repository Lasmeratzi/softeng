const express = require('express');
const multer = require('multer');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Routes
router.post('/events', upload.single('eventPost'), eventController.addEvent);
router.get('/events', eventController.getAllEvents);
router.get('/events/:id', eventController.getEventById);
router.put('/events/:id', upload.single('eventPost'), eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);

module.exports = router;
