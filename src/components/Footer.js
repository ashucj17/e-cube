import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5>E-Cube</h5>
            <p className="text-muted">Your ultimate entertainment destination for movies and events.</p>
          </div>
          <div className="col-md-2 mb-3 mb-md-0">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
              <li><Link to="/movies" className="text-decoration-none text-muted">Movies</Link></li>
              <li><Link to="/events" className="text-decoration-none text-muted">Events</Link></li>
            </ul>
          </div>
          <div className="col-md-3 mb-3 mb-md-0">
            <h5>Resources</h5>
            <ul className="list-unstyled">
              <li><Link to="#" className="text-decoration-none text-muted">Terms of Service</Link></li>
              <li><Link to="#" className="text-decoration-none text-muted">Privacy Policy</Link></li>
              <li><Link to="#" className="text-decoration-none text-muted">FAQs</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li className="text-muted">Email: info@ecube.com</li>
              <li className="text-muted">Phone: +1 (123) 456-7890</li>
              <li className="text-muted">Address: 123 Entertainment Blvd,<br />Los Angeles, CA 90001</li>
            </ul>
          </div>
        </div>
        <hr className="my-3 bg-secondary" />
        <div className="text-center text-muted">
          <small>&copy; {new Date().getFullYear()} E-Cube. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;