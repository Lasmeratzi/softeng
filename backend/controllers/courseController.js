const Course = require('../models/courseModels');

exports.addCourse = (req, res) => {
    const courseData = req.body;
    console.log('Received courseData:', courseData); // Debugging log

    if (!courseData.departmentId || !courseData.courseName || !courseData.courseAbbrev) {
        console.log('Missing required fields:', courseData); // Debugging log
        return res.status(400).json({ message: 'Missing required fields' });
    }

    Course.create(courseData, (err, result) => {
        if (err) {
            console.error('Error adding course:', err);
            return res.status(500).json({ message: 'Error adding course', error: err });
        }
        console.log('Course added successfully:', result); // Debugging log
        res.status(200).json({ message: 'Course added successfully!', id: result.insertId });
    });
};



exports.getCoursesByDepartment = (req, res) => {
    const departmentId = req.query.departmentId;
    Course.getByDepartment(departmentId, (err, results) => {
        if (err) {
            console.error('Error fetching courses:', err);
            return res.status(500).json({ message: 'Error fetching courses', error: err });
        }
        res.json(results);
    });
};

// Other functions remain the same

exports.getAllCourses = (req, res) => {
    Course.getAll((err, results) => {
      if (err) {
        console.error('Error fetching courses:', err);
        return res.status(500).json({ message: 'Error fetching courses', error: err });
      }
      res.json(results);
    });
  };
  
  // Other functions remain the same

exports.getCourseById = (req, res) => {
    const courseId = req.params.id;
    Course.getById(courseId, (err, results) => {
        if (err) {
            console.error('Error fetching course:', err);
            return res.status(500).json({ message: 'Error fetching course', error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(results[0]);
    });
};

exports.updateCourse = (req, res) => {
    const courseId = req.params.id;
    const courseData = req.body;

    Course.update(courseId, courseData, (err, result) => {
        if (err) {
            console.error('Error updating course:', err);
            return res.status(500).json({ message: 'Error updating course', error: err });
        }
        res.status(200).json({ message: 'Course updated successfully!' });
    });
};

exports.deleteCourse = (req, res) => {
    const courseId = req.params.id;

    Course.delete(courseId, (err, result) => {
        if (err) {
            console.error('Error deleting course:', err);
            return res.status(500).json({ message: 'Error deleting course', error: err });
        }
        res.status(204).json({ message: 'Course deleted successfully!' });
    });
};

