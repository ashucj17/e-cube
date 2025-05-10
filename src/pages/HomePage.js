// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/actions/movieActions';
import { fetchEvents } from '../redux/actions/eventActions';
import MovieCard from '../components/MovieCard';
import EventCard from '../components/EventCard';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const { movies, loading: moviesLoading } = useSelector(state => state.movies);
  const { events, loading: eventsLoading } = useSelector(state => state.events);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchEvents());
  }, [dispatch]);

  // Filter movies by now showing and coming soon
  const nowShowingMovies = movies?.filter(movie => movie.status === 'now_showing') || [];
  const comingSoonMovies = movies?.filter(movie => movie.status === 'coming_soon') || [];

  const renderMoviesByTab = () => {
    const moviesToShow = activeTabIndex === 0 ? nowShowingMovies : comingSoonMovies;
    
    if (moviesLoading) {
      return (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }
    
    if (moviesToShow.length === 0) {
      return (
        <div className="text-center py-5">
          <p className="text-muted">No movies available in this category</p>
        </div>
      );
    }
    
    return (
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {moviesToShow.slice(0, 8).map(movie => (
          <div className="col" key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="bg-dark text-white py-5 mb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-3">Experience Movies Like Never Before</h1>
              <p className="lead mb-4">Book your tickets for the latest blockbusters and enjoy a premium cinema experience.</p>
              <div className="d-flex gap-3">
                <a href="#now-showing" className="btn btn-primary btn-lg">Now Showing</a>
                <Link to="/upcoming" className="btn btn-outline-light btn-lg">Upcoming Movies</Link>
              </div>
            </div>
            <div className="col-lg-6">
              {/* Use a carousel here for featured movies if desired */}
              <img 
                src="/path/to/hero-image.jpg" 
                className="img-fluid rounded shadow"
                alt="Cinema experience"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Movies Section */}
      <section className="py-5" id="now-showing">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Movies</h2>
            <div className="d-flex">
              <Link to="/movies" className="btn btn-outline-primary">
                View All Movies
              </Link>
            </div>
          </div>
          
          {/* Tabs for Now Showing / Coming Soon */}
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTabIndex === 0 ? 'active' : ''}`}
                onClick={() => setActiveTabIndex(0)}
              >
                Now Showing
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTabIndex === 1 ? 'active' : ''}`}
                onClick={() => setActiveTabIndex(1)}
              >
                Coming Soon
              </button>
            </li>
          </ul>
          
          {renderMoviesByTab()}
        </div>
      </section>
      
      {/* Events Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Special Events</h2>
            <Link to="/events" className="btn btn-outline-primary">
              View All Events
            </Link>
          </div>
          
          {eventsLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No events available</p>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {events.slice(0, 3).map(event => (
                <div className="col" key={event.id}>
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Promotions/Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold text-center mb-5">Why Choose CinemaPlus</h2>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <i className="bi bi-film text-primary" style={{ fontSize: "3rem" }}></i>
                  </div>
                  <h3 className="card-title h5">Premium Screens</h3>
                  <p className="card-text text-muted">
                    Experience movies in stunning clarity on our state-of-the-art screens.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <i className="bi bi-cup-straw text-primary" style={{ fontSize: "3rem" }}></i>
                  </div>
                  <h3 className="card-title h5">Gourmet Concessions</h3>
                  <p className="card-text text-muted">
                    Enjoy premium snacks and beverages from our extensive menu.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <i className="bi bi-ticket-perforated text-primary" style={{ fontSize: "3rem" }}></i>
                  </div>
                  <h3 className="card-title h5">Easy Booking</h3>
                  <p className="card-text text-muted">
                    Book tickets in seconds and skip the line with our digital tickets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;