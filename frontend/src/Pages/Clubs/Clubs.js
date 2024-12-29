import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Clubs.css';
import logo from './lccb.png';

function Clubs() {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [courses, setCourses] = useState([]);
  const [clubData, setClubData] = useState({
    clubId: '',
    departmentId: '',
    clubLogo: '',
    clubName: '',
    courseAbbrev: '',
    clubColor: '#ffffff' // Default color
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchClubs();
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      filterClubsByDepartment(selectedDepartment);
    } else {
      setFilteredClubs(clubs); // Show all clubs if no department is selected
    }
  }, [selectedDepartment, clubs]);

  const fetchClubs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/clubs');
      setClubs(response.data);
      setFilteredClubs(response.data); // Initialize filtered clubs with all clubs
    } catch (error) {
      console.error('Error fetching clubs:', error);
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

  const fetchCourses = async (departmentId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/courses?departmentId=${departmentId}`);
      console.log('Fetched Courses for Department ID:', departmentId, response.data); // Debugging log
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClubData({
      ...clubData,
      [name]: value
    });
  };

  const handleDepartmentChange = (e) => {
    const { value } = e.target;
    setClubData((prevData) => ({
      ...prevData,
      departmentId: value,
      courseAbbrev: '' // Reset courseAbbrev when department changes
    }));
    fetchCourses(value); // Fetch courses for the selected department
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setClubData((prevData) => ({
        ...prevData,
        clubLogo: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { clubId, departmentId, clubLogo, clubName, courseAbbrev, clubColor } = clubData;

    if (!departmentId || !clubLogo || !clubName || !courseAbbrev || !clubColor) {
      alert("Please fill in all fields");
      return;
    }

    try {
      if (isUpdating) {
        await axios.put(`http://localhost:5000/api/clubs/${clubId}`, clubData);
        alert('Club updated successfully!');
        setIsUpdating(false);
      } else {
        await axios.post('http://localhost:5000/api/clubs', clubData);
        alert('Club added successfully!');
      }
      setClubData({ clubId: '', departmentId: '', clubLogo: '', clubName: '', courseAbbrev: '', clubColor: '#ffffff' });
      fetchClubs(); // Fetch updated data after submission
    } catch (error) {
      console.error('Error:', error);
      alert(`There was an error ${isUpdating ? 'updating' : 'adding'} the club.`);
    }
  };

  const handleUpdate = (club) => {
    setClubData({
      clubId: club.club_id,
      departmentId: club.department_id,
      clubLogo: club.club_logo,
      clubName: club.club_name,
      courseAbbrev: club.course_abbrev,
      clubColor: club.club_color
    });
    fetchCourses(club.department_id); // Fetch courses for the selected department
    setIsUpdating(true);
  };

  const handleDelete = async (clubId) => {
    if (window.confirm('Are you sure you want to delete this club?')) {
      try {
        await axios.delete(`http://localhost:5000/api/clubs/${clubId}`);
        alert('Club deleted successfully!');
        fetchClubs();
      } catch (error) {
        console.error('Error deleting club:', error);
        alert('There was an error deleting the club.');
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

  const handleCheckOfficers = () => {
    navigate('/officers');
  };

  const filterClubsByDepartment = (departmentId) => {
    const filtered = clubs.filter(club => club.department_id === Number(departmentId));
    setFilteredClubs(filtered);
  };

  return (
    <div className="profile-container22">
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

      <div className="main-section22">
        <h2 className="title22">LCCB CLUBS</h2>
        <form className="horizontal-form22" onSubmit={handleSubmit}>
          <div className="form-group22">
            <label>Department ID</label>
            <select 
              name="departmentId" 
              value={clubData.departmentId} 
              onChange={handleDepartmentChange} 
              className="input-field22"
            >
              <option value="">Select Department</option>
              {departments.map(department => (
                <option key={department.department_id} value={department.department_id}>
                  {department.department_name} ({department.department_id})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group22">
            <label>Club Logo</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="input-field22" 
            />
          </div>
          <div className="form-group22">
            <label>Club Color</label>
            <div className="color-input-wrapper22">
              <input 
                type="color" 
                name="clubColor" 
                value={clubData.clubColor}
                onChange={handleInputChange}
                className="color-picker22" 
              />
              <input 
                type="text" 
                name="clubColor"
                placeholder="#ffffff"
                value={clubData.clubColor}
                onChange={handleInputChange}
                className="color-code-input22"
              />
            </div>
          </div>
          <div className="form-group22">
            <label>Club Name</label>
            <input 
              type="text" 
              name="clubName" 
              placeholder="Club Name" 
              value={clubData.clubName}
              onChange={handleInputChange}
              className="input-field22" 
            />
          </div>
          <div className="form-group22">
            <label>Course Abbreviation</label>
            <select 
              name="courseAbbrev" 
              value={clubData.courseAbbrev} 
              onChange={handleInputChange} 
              className="input-field22"
            >
              <option value="">Select Course</option>
              {courses.map(course => (
                <option key={course.course_id} value={course.course_abbrev}>
                  {course.course_abbrev}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button22">
            {isUpdating ? 'Update' : 'Submit'}
          </button>
        </form>
        
        <h2 className="titlexz">EXISTING CLUBS</h2>
        <div className="filter-section22">
          <div className="form-group22">
            <label>Filter by Department</label>
            <select
              name="selectedDepartment"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="input-field22"
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

        
        <div className="table-container22">
          <table className="clubs-table22">
            <thead>
              <tr>
                <th>ID</th>
                <th>Logo</th>
                <th>Name</th>
                <th>Color</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClubs.map(club => (
                <tr key={club.club_id}>
                  <td>{club.club_id}</td>
                  <td><img src={`http://localhost:5000/uploads/${club.club_logo}`} alt="Logo" width="50"/></td>
                  <td>{club.club_name}</td>
                  <td>
                    <div style={{ width: '50px', height: '20px', backgroundColor: club.club_color }}></div>
                  </td>
                  <td>
                    <button className="update-button22" onClick={() => handleUpdate(club)}>Update</button>
                    <button className="delete-button22" onClick={() => handleDelete(club.club_id)}>Delete</button>
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

export default Clubs;