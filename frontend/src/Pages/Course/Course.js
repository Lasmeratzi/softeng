import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Course.css';
import logo from './lccb.png'; 

function Course() {
  const navigate = useNavigate(); 
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [courseData, setCourseData] = useState({
    courseName: '',
    departmentId: '',
    courseAbbrev: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchCourses();
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      filterCoursesByDepartment(selectedDepartment);
    } else {
      setFilteredCourses(courses); // Show all courses if no department is selected
    }
  }, [selectedDepartment, courses]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/all-courses');
      console.log('Fetched Courses:', response.data);
      setCourses(response.data);
      setFilteredCourses(response.data); // Initialize filtered courses with all courses
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/departments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { courseName, departmentId, courseAbbrev } = courseData;

    if (!courseName || !departmentId || !courseAbbrev) {
      alert("Please fill in all fields");
      return;
    }

    try {
      if (isUpdating) {
        await axios.put(`http://localhost:5000/api/courses/${courseData.courseId}`, courseData);
        alert('Course updated successfully!');
        setIsUpdating(false);
      } else {
        console.log('Adding Course:', courseData); // Debugging log
        await axios.post('http://localhost:5000/api/course', courseData);
        alert('Course added successfully!');
      }
      setCourseData({ courseName: '', departmentId: '', courseAbbrev: '' });
      fetchCourses();
    } catch (error) {
      console.error('Error submitting course:', error); // Debugging log
      alert(`There was an error ${isUpdating ? 'updating' : 'adding'} the course.`);
    }
  };

  const handleUpdate = (course) => {
    console.log('Updating Course:', course); // Debugging log
    setCourseData({
      courseId: course.course_id,
      courseName: course.course_name,
      departmentId: course.department_id,
      courseAbbrev: course.course_abbrev
    });
    setIsUpdating(true);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`http://localhost:5000/api/courses/${courseId}`);
        alert('Course deleted successfully!');
        fetchCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('There was an error deleting the course.');
      }
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleNavigation = (path) => (e) => {
    e.preventDefault();
    navigate(path);
  };

  const filterCoursesByDepartment = (departmentId) => {
    const filtered = courses.filter(course => course.department_id === Number(departmentId));
    setFilteredCourses(filtered);
  };

  return (
    <div className="course-container22x">
      <nav className="events-navbar">
        <div className="events-left-navbar">
          <img src={logo} alt="LCCB Logo" className="events-logo" />
          <ul className="events-nav-links">
            <h1 className="events-site-title">LCCB NEXUS</h1>
            <li><a href="/departments" onClick={handleNavigation('/departments')}>DEPARTMENTS</a></li>
            <li><a href="/clubs" onClick={handleNavigation('/clubs')}>CLUBS</a></li>
            <li><a href="/course" onClick={handleNavigation('/course')}>COURSES</a></li>
          </ul>
        </div>
        <button className="events-logout-button" onClick={handleLogout}>Log out</button>
      </nav>

      <div className="main-section22x">
        <h2 className="titlexz">COURSES</h2>
        <form className="horizontal-form22x" onSubmit={handleSubmit}>
          <div className="form-groupx">
            <label>Department ID</label>
            <select
              name="departmentId"
              value={courseData.departmentId}
              onChange={handleInputChange}
              className="input-field22x"
            >
              <option value="">Select Department</option>
              {departments.map(department => (
                <option key={department.department_id} value={department.department_id}>{department.department_name}</option>
              ))}
            </select>
          </div>
          <div className="form-groupx">
            <label>Course Name</label>
            <input 
              type="text" 
              name="courseName" 
              placeholder="Course Name" 
              value={courseData.courseName}
              onChange={handleInputChange}
              className="input-field22x" 
            />
          </div>
          <div className="form-groupx">
            <label>Course Abbreviation</label>
            <input 
              type="text" 
              name="courseAbbrev" 
              placeholder="Course Abbreviation" 
              value={courseData.courseAbbrev}
              onChange={handleInputChange}
              className="input-field22x" 
            />
          </div>
          <button type="submit" className="submit-button22x">
            {isUpdating ? 'Update' : 'Submit'}
          </button>
        </form>
        
        <h2 className="titlex">EXISTING COURSES</h2>
        <div className="filter-section22x">
          <div className="form-groupx">
            <label>Filter by Department</label>
            
            <select
              name="selectedDepartment"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="input-field22x"
            >
              <option value="">All Departments</option>
              {departments.map(department => (
                <option key={department.department_id} value={department.department_id}>
                  {department.department_name} ({department.department_id})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-container22x">
          <table className="courses-table22x">
            <thead>
              <tr>
                <th>ID</th>
                <th>Department ID</th>
                <th>Course Name</th>
                <th>Course Abbreviation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map(course => (
                               <tr key={course.course_id}>
                               <td>{course.course_id}</td>
                               <td>{course.department_id}</td>
                               <td>{course.course_name}</td>
                               <td>{course.course_abbrev}</td>
                               <td>
                                 <button className="update-button22x" onClick={() => handleUpdate(course)}>Update</button>
                                 <button className="delete-button22x" onClick={() => handleDelete(course.course_id)}>Delete</button>
                               </td>
                             </tr>
                           ))}
                         </tbody>
                       </table>
                       </div>
                     {/* Footer Section */}
        <footer className="footer-section22">
          <p>&copy; {new Date().getFullYear()} LCCB. All rights reserved.</p>
        </footer>
      </div>
    </div>
               );
             }
             
             export default Course;
             