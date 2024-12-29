import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Ensure you're importing the CSS for the footer
import logo5 from './lcb2.png';
import logo4 from './lolwh.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="logo-container">
          <img src={logo5} alt="LCCB Logo5" className="student-logo5" />
          <img src={logo4} alt="LCCB Logo4" className="student-logo4" />
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
