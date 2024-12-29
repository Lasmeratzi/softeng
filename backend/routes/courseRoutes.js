const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.post('/course', courseController.addCourse);
router.get('/courses/:id', courseController.getCourseById);
router.put('/courses/:id', courseController.updateCourse);
router.delete('/courses/:id', courseController.deleteCourse);
router.get('/courses', courseController.getCoursesByDepartment); // Ensure this line fetches by department if query parameter is provided
router.get('/all-courses', courseController.getAllCourses); // Ensure this line fetches all courses

module.exports = router;
