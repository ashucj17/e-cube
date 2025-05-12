import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT } from '../redux/types';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth || { isAuthenticated: false, user: null });

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">E-Cube</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <button
  className="nav-link dropdown-toggle btn btn-link"
  id="moviesDropdown"
  data-bs-toggle="dropdown"
  aria-expanded="false"
>
  Movies
</button>
              <ul className="dropdown-menu" aria-labelledby="moviesDropdown">
                <li><Link className="dropdown-item" to="/movies">All Movies</Link></li>
                <li><Link className="dropdown-item" to="/latest-movies">Latest Movies</Link></li>
                <li><Link className="dropdown-item" to="/upcoming-movies">Upcoming Movies</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/events">Events</Link>
            </li>
          </ul>
          <div className="d-flex">
            {isAuthenticated ? (
              <>
                <Link className="btn btn-outline-light me-2" to="/profile">
                  {user?.name || 'Profile'}
                </Link>
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-light me-2" to="/login">
                  Login
                </Link>
                <Link className="btn btn-light" to="/register">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;