import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Officers.css'; // Assuming the file is named 'Officers.css'
import logo from './lccb.png';

function Officers() {
  const navigate = useNavigate();
  const [officers, setOfficers] = useState([]);
  const [officerData, setOfficerData] = useState({
    officerId: '',
    clubId: '',
    officerFname: '',
    officerLname: '',
    position: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchOfficers();
  }, []);

  const fetchOfficers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/officers');
      setOfficers(response.data);
    } catch (error) {
      console.error('Error fetching officers:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOfficerData({
      ...officerData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { officerId, clubId, officerFname, officerLname, position } = officerData;

    if (!clubId || !officerFname || !officerLname || !position) {
      alert("Please fill in all fields");
      return;
    }

    try {
      if (isUpdating) {
        await axios.put(`http://localhost:5000/api/officers/${officerId}`, officerData);
        alert('Officer updated successfully!');
        setIsUpdating(false);
      } else {
        await axios.post('http://localhost:5000/api/officers', officerData);
        alert('Officer added successfully!');
      }
      setOfficerData({ officerId: '', clubId: '', officerFname: '', officerLname: '', position: '' });
      fetchOfficers(); // Fetch updated data after submission
    } catch (error) {
      console.error('Error:', error);
      alert(`There was an error ${isUpdating ? 'updating' : 'adding'} the officer.`);
    }
  };

  const handleUpdate = (officer) => {
    setOfficerData({
      officerId: officer.officer_id,
      clubId: officer.club_id,
      officerFname: officer.officer_fname,
      officerLname: officer.officer_lname,
      position: officer.position
    });
    setIsUpdating(true);
  };

  const handleDelete = async (officerId) => {
    if (window.confirm('Are you sure you want to delete this officer?')) {
      try {
        await axios.delete(`http://localhost:5000/api/officers/${officerId}`);
        alert('Officer deleted successfully!');
        fetchOfficers();
      } catch (error) {
        console.error('Error deleting officer:', error);
        alert('There was an error deleting the officer.');
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
    <nav className="events-navbar">
<div className="events-left-navbar">
 <img src={logo} alt="LCCB Logo" className="events-logo" />
 <ul className="events-nav-links">
 <h1 className="events-site-title">LCCB NEXUS </h1>
   <li><a href="/departments" onClick={handleNavigation('/departments')}>DEPARTMENTS</a></li>
   <li><a href="/events" onClick={handleNavigation('/events')}>EVENTS</a></li>
   <li><a href="/clubs" onClick={handleNavigation('/clubs')}>CLUBS</a></li>
 </ul>
</div>
<button className="events-logout-button" onClick={handleLogout}>Log out</button>
</nav>

      <div className="main-section33">
        <div className="left-section33">
         
          <form className="events-form33" onSubmit={handleSubmit}>
          <h2 className="upcoming-title33">CLUB OFFICERS</h2>
            <label>Club-ID</label>
            <input 
              type="text" 
              name="clubId" 
              placeholder="Club ID" 
              value={officerData.clubId}
              onChange={handleInputChange}
              className="input-field33" 
            />
            <label>First Name</label>
            <input 
              type="text" 
              name="officerFname" 
              placeholder="First Name" 
              value={officerData.officerFname}
              onChange={handleInputChange}
              className="input-field33" 
            />
       <label>Last Name</label>
            <input 
              type="text" 
              name="officerLname" 
              placeholder="Last Name" 
              value={officerData.officerLname}
              onChange={handleInputChange}
              className="input-field33" 
            />
            <label>Position</label>
            <input 
              type="text" 
              name="position" 
              placeholder="Position" 
              value={officerData.position}
              onChange={handleInputChange}
              className="input-field33" 
            />
            <button type="submit" className="submit-button33">
              {isUpdating ? 'Update' : 'Submit'}
            </button>
          </form>
        </div>
        <div className="right-section33">
          <h2 className="upcoming-title33">EXISTING OFFICERS</h2>
          <table className="officers-table33">
            <thead>
              <tr>
                <th>ID</th>
                <th>Club ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Position</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {officers.map(officer => (
                <tr key={officer.officer_id}>
                  <td>{officer.officer_id}</td>
                  <td>{officer.club_id}</td>
                  <td>{officer.officer_fname}</td>
                  <td>{officer.officer_lname}</td>
                  <td>{officer.position}</td>
                  <td>
                    <button className="update-button33" onClick={() => handleUpdate(officer)}>Update</button>
                    <button className="delete-button33" onClick={() => handleDelete(officer.officer_id)}>Delete</button>
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

export default Officers;
