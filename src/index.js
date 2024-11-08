import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login'; 
import Departments from './Pages/Departments/Departments';
import Clubs from './Pages/Clubs/Clubs';
import Shome from './Pages/Shome/Shome';  // User home
import About1 from './Pages/About1/About1'; // About page
import Events from './Pages/Events/Events'; // About page
import reportWebVitals from './reportWebVitals';
import Sbitclubs from './Pages/Sbitclubs/Sbitclubs';
import Sarfaidclubs from './Pages/Sarfaidclubs/Sarfaidclubs';
import Shtmclubs from './Pages/Shtmclubs/Shtmclubs';
import Clubs from './Pages/Clubs/Clubs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Login page as the default route */}
        <Route path="/user" element={<Shome />} />  {/* Regular user home page */}
        <Route path="/departments" element={<Departments />} />
        <Route path="/about" element={<About1 />} />  {/* About page */}
        <Route path="/aboutm" element={<Aboutm />} />

        <Route path="/clubs" element={<Clubs />} />
        
         {/* clubs page */}
        <Route path="/Sbitclubs" element={<Sbitclubs />} />
        <Route path="/Sarfaidclubs" element={<Sarfaidclubs />} />
        <Route path="/Shtmclubs" element={<Shtmclubs />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
