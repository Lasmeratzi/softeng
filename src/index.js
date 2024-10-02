import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login'; 
import Ahome from './Pages/Ahome/Ahome';  // Admin home
import Shome from './Pages/Shome/Shome';  // User home
import About from './Pages/About/About'; // About page
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Login page as the default route */}
        <Route path="/user" element={<Shome />} />  {/* Regular user home page */}
        <Route path="/admin" element={<Ahome />} />  {/* Admin home page */}
        <Route path="/about" element={<About />} />  {/* About page */}
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
