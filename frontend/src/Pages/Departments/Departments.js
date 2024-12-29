import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Departments.css';
import logo from './lccb.png'; 

function Departments() {
  const navigate = useNavigate(); 
  const [departments, setDepartments] = useState([]);
  const [departmentData, setDepartmentData] = useState({
    departmentName: '',
    departmentLogo: '',
    courseCount: '',
    departmentColor: '#ffffff' // Default color
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

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
    setDepartmentData({
      ...departmentData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setDepartmentData((prevData) => ({
        ...prevData,
        departmentLogo: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleColorChange = (e) => {
    const { value } = e.target;
    setDepartmentData((prevData) => ({
      ...prevData,
      departmentColor: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { departmentLogo, departmentName, courseCount, departmentColor } = departmentData;

    if (!departmentLogo || !departmentName || !courseCount || !departmentColor) {
      alert("Please fill in all fields");
      return;
    }

    try {
      if (isUpdating) {
        await axios.put(`http://localhost:5000/api/departments/${departmentData.departmentId}`, departmentData);
        alert('Department updated successfully!');
        setIsUpdating(false);
      } else {
        await axios.post('http://localhost:5000/api/departments', departmentData);
        alert('Department added successfully!');
      }
      setDepartmentData({ departmentName: '', departmentLogo: '', courseCount: '', departmentColor: '#ffffff' });
      fetchDepartments(); // Fetch updated data after submission
    } catch (error) {
      console.error('Error:', error);
      alert(`There was an error ${isUpdating ? 'updating' : 'adding'} the department.`);
    }
  };

  const handleUpdate = (department) => {
    setDepartmentData({
      departmentId: department.department_id,
      departmentName: department.department_name,
      departmentLogo: department.department_logo,
      courseCount: department.course_count,
      departmentColor: department.department_color
    });
    setIsUpdating(true);
  };

  const handleDelete = async (departmentId) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await axios.delete(`http://localhost:5000/api/departments/${departmentId}`);
        alert('Department deleted successfully!');
        fetchDepartments();
      } catch (error) {
        console.error('Error deleting department:', error);
        alert('There was an error deleting the department.');
      }
    }
  };

  const handleLogout = () => {
    navigate('/'); // Redirect to the home page (or login page)
  };

  const handleNavigation = (path) => (e) => {
    e.preventDefault();
    navigate(path);
  };

  const handleCheckCourses = () => {
    navigate('/course'); // Navigate to the Course.js page
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

      <div className="main-section22x">
        <h2 className="titlexz">DEPARTMENT FORM</h2>
        <form className="horizontal-form22x" onSubmit={handleSubmit}>
          <div className="form-groupx">
            <label>Department Logo</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="input-field22x" 
            />
          </div>
          <div className="form-groupx">
            <label>Department Name</label>
            <input 
              type="text" 
              name="departmentName" 
              placeholder="Department Name" 
              value={departmentData.departmentName}
              onChange={handleInputChange}
              className="input-field22x" 
            />
          </div>
          <div className="form-groupx">
            <label>Course Count</label>
            <input 
              type="number" 
              name="courseCount" 
              placeholder="Number of Courses" 
              value={departmentData.courseCount}
              onChange={handleInputChange}
              className="input-field22x" 
            />
          </div>
          <div className="form-groupx">
            <label>Department Color</label>
            <div className="color-input-wrapperx">
              <input 
                type="color" 
                name="departmentColor" 
                value={departmentData.departmentColor}
                onChange={handleColorChange}
                className="input-field22x color-pickerx" 
              />
              <input 
                type="text" 
                name="departmentColor"
                placeholder="#ffffff"
                value={departmentData.departmentColor}
                onChange={handleColorChange}
                className="input-field22x color-code-inputx"
              />
            </div>
          </div>
          <button type="submit" className="submit-button22x">
            {isUpdating ? 'Update' : 'Submit'}
          </button>
        </form>
        
        <h2 className="titlex">EXISTING DEPARTMENTS</h2>
        <div className="table-container22x">
          <table className="departments-table22x">
            <thead>
              <tr>
                <th>ID</th>
                <th>Logo</th>
                <th>Name</th>
                <th>Color</th>
                <th>
                  Course Count
                  <br></br>
                  <button onClick={handleCheckCourses} className="check-courses-button22x">Check Courses</button>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map(department => (
                <tr key={department.department_id}>
                  <td>{department.department_id}</td>
                  <td><img src={`http://localhost:5000/uploads/${department.department_logo}`} alt="Logo" width="50"/></td>
                  <td>{department.department_name}</td>
                  <td>
                    <div style={{ width: '50px', height: '20px', backgroundColor: department.department_color }}></div>
                  </td>
                  <td>{department.course_count}</td>
                  <td>
                    <button className="update-button22x" onClick={() => handleUpdate(department)}>Update</button>
                    <button className="delete-button22x" onClick={() => handleDelete(department.department_id)}>Delete</button>
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

export default Departments;
