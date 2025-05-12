import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/actions/movieActions';

const HomePage = () => {
  const dispatch = useDispatch();
  const { movies, loading } = useSelector((state) => state.movies || { movies: [], loading: false });

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  // Show just the first 4 movies on the homepage
  const featuredMovies = movies.slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="bg-dark text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-4 fw-bold mb-4">Your Entertainment Destination</h1>
              <p className="lead mb-4">Book movie tickets and events all in one place. Experience entertainment like never before.</p>
              <div className="d-grid gap-2 d-md-flex">
                <Link to="/movies" className="btn btn-primary btn-lg px-4">Explore Movies</Link>
                <Link to="/events" className="btn btn-outline-light btn-lg px-4">Discover Events</Link>
              </div>
            </div>
            <div className="col-md-6 d-none d-md-block">
              <img src="https://via.placeholder.com/600x400?text=Entertainment+Hub" alt="Entertainment Hub" className="img-fluid rounded shadow" />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Movies Section */}
      <div className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Featured Movies</h2>
            <Link to="/movies" className="btn btn-outline-primary">View All</Link>
          </div>
          
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {featuredMovies.map((movie) => (
                <div className="col" key={movie.id}>
                  <div className="card h-100 shadow">
                    {movie.poster_path ? (
                      <img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        className="card-img-top" 
                        alt={movie.title}
                        style={{ height: '300px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="bg-secondary text-white d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                        No Image
                      </div>
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text small text-truncate">{movie.overview}</p>
                      <Link to={`/movie/${movie.id}`} className="btn btn-sm btn-primary">View Details</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="mb-3">Join Our Community</h2>
          <p className="lead mb-4">Sign up today to receive exclusive offers and updates on new releases.</p>
          <Link to="/register" className="btn btn-light btn-lg px-4">Register Now</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;