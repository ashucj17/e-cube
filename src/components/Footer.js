// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">E-Cube</h5>
            <p className="text-muted">
              Your premier destination for movies, events, and unforgettable entertainment experiences.
            </p>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" className="text-white" aria-label="Facebook">
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a href="https://twitter.com" className="text-white" aria-label="Twitter">
                <i className="bi bi-twitter fs-5"></i>
              </a>
              <a href="https://instagram.com" className="text-white" aria-label="Instagram">
                <i className="bi bi-instagram fs-5"></i>
              </a>
            </div>
          </div>
          
          <div className="col-md-2 mb-4 mb-md-0">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-secondary">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/upcoming" className="text-decoration-none text-secondary">Upcoming Movies</Link>
              </li>
              <li className="mb-2">
                <Link to="/events" className="text-decoration-none text-secondary">Events</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-md-2 mb-4 mb-md-0">
            <h6 className="fw-bold mb-3">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/faq" className="text-decoration-none text-secondary">FAQ</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-decoration-none text-secondary">Contact Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className="text-decoration-none text-secondary">Terms of Service</Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy" className="text-decoration-none text-secondary">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-md-4">
            <h6 className="fw-bold mb-3">Subscribe to our Newsletter</h6>
            <p className="text-muted mb-3">Stay updated with our latest movies and events</p>
            <form className="d-flex">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Your email address"
                aria-label="Email address for newsletter"
              />
              <button type="submit" className="btn btn-primary ms-2">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <hr className="my-4 border-secondary" />
        
        <div className="text-center text-muted small">
          <p className="mb-0">© {new Date().getFullYear()} CinemaPlus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;