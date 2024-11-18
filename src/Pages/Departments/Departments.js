import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Departments.css';
import logo from './lccb.png'; 

function Departments() {
  const navigate = useNavigate(); 
  const [departments, setDepartments] = useState([]);
  const [departmentData, setDepartmentData] = useState({
    departmentId: '',
    departmentName: '',
    departmentLogo: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { departmentId, departmentLogo, departmentName, departmentColor } = departmentData;

    if (!departmentId || !departmentLogo || !departmentName || !departmentColor) {
      alert("Please fill in all fields");
      return;
    }

    try {
      if (isUpdating) {
        await axios.put(`http://localhost:5000/api/departments/${departmentId}`, departmentData);
        alert('Department updated successfully!');
        setIsUpdating(false);
      } else {
        await axios.post('http://localhost:5000/api/departments', departmentData);
        alert('Department added successfully!');
      }
      setDepartmentData({ departmentId: '', departmentName: '', departmentLogo: '', departmentColor: '#ffffff' });
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
    navigate('/');
  };

  const handleNavigation = (path) => (e) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className="profile-container22">
      <nav className="navbar22">
        <img src={logo} alt="LCCB Logo" className="logo22" />
        <h1 className="site-title22">LCCB-CLUBSPHERE</h1>
        <ul className="nav-links22">
          <li><a href="/departments" onClick={handleNavigation('/departments')}>DEPARTMENTS</a></li>
          <li><a href="/events" onClick={handleNavigation('/events')}>EVENTS</a></li>
          <li><a href="/clubs" onClick={handleNavigation('/clubs')}>CLUBS</a></li>
        </ul>
        <button className="logout-button22" onClick={handleLogout}>Log out</button>
      </nav>

      <div className="main-section22">
        <div className="left-section22">
          <h2 className="upcoming-title22">DEPARTMENTS</h2>
          <form className="events-form22" onSubmit={handleSubmit}>
            <h1>Department-ID</h1>
            <input 
              type="text" 
              name="departmentId" 
              placeholder="Department ID" 
              value={departmentData.departmentId}
              onChange={handleInputChange}
              className="input-field22" 
              readOnly={isUpdating} 
            />
            <h1>Department Logo</h1>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="input-field22" 
            />
            <h1>Department Name</h1>
            <input 
              type="text" 
              name="departmentName" 
              placeholder="Department Name" 
              value={departmentData.departmentName}
              onChange={handleInputChange}
              className="input-field22" 
            />
            <h1>Department Color</h1>
            <input 
              type="color" 
              name="departmentColor" 
              value={departmentData.departmentColor}
              onChange={handleInputChange}
              className="input-field22" 
            />
            <button type="submit" className="submit-button22">
              {isUpdating ? 'Update' : 'Submit'}
            </button>
          </form>
        </div>
        <div className="right-section22">
          <h2 className="upcoming-title22">EXISTING DEPARTMENTS</h2>
          <table className="departments-table22">
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
              {departments.map(department => (
                <tr key={department.department_id}>
                  <td>{department.department_id}</td>
                  <td><img src={`http://localhost:5000/uploads/${department.department_logo}`} alt="Logo" width="50"/></td>
                  <td>{department.department_name}</td>
                  <td>
                    <div style={{ width: '50px', height: '20px', backgroundColor: department.department_color }}></div>
                  </td>
                  <td>
                    <button className="update-button22" onClick={() => handleUpdate(department)}>Update</button>
                    <button className="delete-button22" onClick={() => handleDelete(department.department_id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Departments;
