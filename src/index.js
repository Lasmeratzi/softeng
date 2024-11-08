import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login'; 
import reportWebVitals from './reportWebVitals';
import Sbitclubs from './Pages/Sbitclubs/Sbitclubs';
import Shome from './Pages/Shome/Shome';
import Sarfaidclubs from './Pages/Sarfaidclubs/Sarfaidclubs';
import Departments from './Pages/Departments/Departments';
import Shtmclubs from './Pages/Shtmclubs/Shtmclubs';
import Clubs from './Pages/Clubs/Clubs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Login page as the default route */}
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/shome" element={<Shome />} />
        
         {/* clubs page */}
        <Route path="/Sbitclubs" element={<Sbitclubs />} />
        <Route path="/Sarfaidclubs" element={<Sarfaidclubs />} />
        <Route path="/Shtmclubs" element={<Shtmclubs />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
