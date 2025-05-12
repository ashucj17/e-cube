import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const selectUserData = state => state.user || {};
const selectIsLoggedIn = state => {
  const userData = selectUserData(state);
  return !!userData.isAuthenticated;
};

const Header = () => {
  // Use selector
  const isLoggedIn = useSelector(selectIsLoggedIn);
  
  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">MovieApp</Link>
      </div>
      <nav className="main-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/movies/upcoming">Upcoming Movies</Link></li>
          <li><Link to="/movies/latest">Latest Movies</Link></li>
          <li><Link to="/events">Events</Link></li>
          {isLoggedIn ? (
            <li><Link to="/profile">Profile</Link></li>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;