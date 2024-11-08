import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login'; 
import Shtm from './Pages/Shtm/Shtm';  // Admin home
import Sbit from './Pages/Sbit/Sbit';
import Sslate from './Pages/Sslate/Sslate';
import Sarfaid from './Pages/Sarfaid/Sarfaid';
import Shome from './Pages/Shome/Shome';  // User home
import About1 from './Pages/About1/About1'; // About page
import Aboutm from './Pages/Aboutm/Aboutm'; // About page
import reportWebVitals from './reportWebVitals';
import Sbitclubs from './Pages/Sbitclubs/Sbitclubs';
import Sarfaidclubs from './Pages/Sarfaidclubs/Sarfaidclubs';
import Shtmclubs from './Pages/Shtmclubs/Shtmclubs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Login page as the default route */}
        <Route path="/user" element={<Shome />} />  {/* Regular user home page */}
        <Route path="/shtm" element={<Shtm />} />  {/* Admin home page */}
        <Route path="/sbit" element={<Sbit />} />
        <Route path="/sslate" element={<Sslate />} />
        <Route path="/sarfaid" element={<Sarfaid />} />
        <Route path="/about" element={<About1 />} />  {/* About page */}
        <Route path="/aboutm" element={<Aboutm />} />
        
         {/* clubs page */}
        <Route path="/Sbitclubs" element={<Sbitclubs />} />
        <Route path="/Sarfaidclubs" element={<Sarfaidclubs />} />
        <Route path="/Shtmclubs" element={<Shtmclubs />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();