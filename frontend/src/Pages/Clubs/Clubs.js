import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Clubs.css';
import logo from './lccb.png';

function Clubs() {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [clubData, setClubData] = useState({
    clubId: '',
    departmentId: '',
    clubLogo: '',
    clubName: '',
    clubColor: '#ffffff' // Default color
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/clubs');
      setClubs(response.data);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClubData({
      ...clubData,
      [name]: value
    });
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
    const { clubId, departmentId, clubLogo, clubName, clubColor } = clubData;

    if (!departmentId || !clubLogo || !clubName || !clubColor) {
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
      setClubData({ clubId: '', departmentId: '', clubLogo: '', clubName: '', clubColor: '#ffffff' });
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
      clubColor: club.club_color
    });
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


      <div className="main-section22">
        <div className="left-section22">
         
          <form className="events-form22" onSubmit={handleSubmit}>
          <h2 className="upcoming-title22">LCCB CLUBS</h2>
          <label>Department ID</label>
            <input 
              type="text" 
              name="departmentId" 
              placeholder="Department ID" 
              value={clubData.departmentId}
              onChange={handleInputChange}
              className="input-field22" 
            />
          <label>Club Logo</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="input-field22" 
            />
           <label>Club Name</label>
            <input 
              type="text" 
              name="clubName" 
              placeholder="Club Name" 
              value={clubData.clubName}
              onChange={handleInputChange}
              className="input-field22" 
            />
        <label>Club Color</label>
            <input 
              type="color" 
              name="clubColor" 
              value={clubData.clubColor}
              onChange={handleInputChange}
              className="input-field22" 
            />
            <button type="submit" className="submit-button22">
              {isUpdating ? 'Update' : 'Submit'}
            </button>
          </form>
        </div>
        <div className="right-section22">
          <h2 className="upcoming-title22">EXISTING CLUBS</h2>
          <table className="clubs-table22">
            <thead>
              <tr>
                <th>ID</th>
                <th>Logo</th>
                <th>Name</th>
                <th>Color</th>
                <th>Actions</th>
                <th>
                  <button onClick={handleCheckOfficers} className="check-officers-button22">Check Officers</button>
                </th>
              </tr>
            </thead>
            <tbody>
              {clubs.map(club => (
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
      </div>
    </div>
  );
}

export default Clubs;
