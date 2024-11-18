import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Ensure you're importing the CSS for the footer
import logo from './lcb2.png';
import logo2 from './lolwh.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="logo-container">
          <img src={logo} alt="LCCB Logo" className="student-logo" />
          <img src={logo2} alt="LCCB Logo2" className="student-logo2" />
        </div>
        <div className="footer-content">
          <span className="copyright">© 2024 Company Name. All Rights Reserved.</span>
          <nav className="footer-nav">
            <div className="footer-link">Privacy Notice</div>
            <div className="footer-link">Terms of Service</div>
            <div className="footer-link">Accessibility</div>
            <div className="footer-link">Cookie Preferences</div>
          </nav>
        </div>
      </div>
    </footer>
  );
}
