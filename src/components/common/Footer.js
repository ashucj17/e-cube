import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>E-Cube Movie Ticket Booking</h3>
            <p>Your one-stop destination for booking movie tickets and live events.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/latest">Latest Movies</a></li>
              <li><a href="/upcoming">Upcoming Movies</a></li>
              <li><a href="/events">Events</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: info@e-cube.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} E-Cube. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;