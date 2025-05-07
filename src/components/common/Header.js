import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/">
            <h1>E-Cube</h1>
          </Link>
        </div>
        <nav className="main-nav">
          <ul>
            <li>
              <NavLink 
                to="/latest" 
                className={({ isActive }) => isActive ? "active" : ""}
              >
                Latest Movies
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/upcoming" 
                className={({ isActive }) => isActive ? "active" : ""}
              >
                Upcoming Movies
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/events" 
                className={({ isActive }) => isActive ? "active" : ""}
              >
                Events
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;