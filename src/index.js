import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login'; 
import Shtm from './Pages/Shtm/Shtm';  // Admin home
import Sbit from './Pages/Sbit/Sbit';
import Shome from './Pages/Shome/Shome';  // User home
import About from './Pages/About/About1'; // About page
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Login page as the default route */}
        <Route path="/user" element={<Shome />} />  {/* Regular user home page */}
        <Route path="/shtm" element={<Shtm />} />  {/* Admin home page */}
        <Route path="/sbit" element={<Sbit />} />
        <Route path="/about" element={<About />} />  {/* About page */}
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
