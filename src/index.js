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
import Sslatelubs from './Pages/Sslateclubs/Sslateclubs';
import Events from './Pages/Events/Events';
import Clubs from './Pages/Clubs/Clubs';
import Officers from './Pages/Officers/Officers';
import About from './Pages/About1/About1';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Login page as the default route */}
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/events" element={<Events />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/shome" element={<Shome />} />
        <Route path="/about1" element={<About />} />
        <Route path="/officers" element={<Officers />} />
        
         {/* clubs page */}
        <Route path="/Sbitclubs" element={<Sbitclubs departmentId={2}/>} />
        <Route path="/Sarfaidclubs" element={<Sarfaidclubs departmentId={3}/>} />
        <Route path="/Shtmclubs" element={<Shtmclubs departmentId={1}/>} />
        
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
