// src/pages/MovieDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails } from '../redux/actions/movieActions';

const MovieDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movie, loading, error } = useSelector(state => state.movies);
  const [selectedDate, setSelectedDate] = useState('');
  
  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    // Set the first available date as default when movie data is loaded
    if (movie && movie.showtimes && movie.showtimes.length > 0) {
      const dates = [...new Set(movie.showtimes.map(show => show.date))];
      if (dates.length > 0 && !selectedDate) {
        setSelectedDate(dates[0]);
      }
    }
  }, [movie, selectedDate]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          Error loading movie details. Please try again later.
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          Movie not found.
        </div>
      </div>
    );
  }

  // Group showtimes by date
  const showtimesByDate = {};
  if (movie.showtimes) {
    movie.showtimes.forEach(showtime => {
      if (!showtimesByDate[showtime.date]) {
        showtimesByDate[showtime.date] = [];
      }
      showtimesByDate[showtime.date].push(showtime);
    });
  }

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="movie-detail-page">
      {/* Movie Hero Section */}
      <div 
        className="bg-dark text-white py-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${movie.backdropUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container py-4">
          <div className="row">
            <div className="col-md-4 mb-4 mb-md-0">
              <img 
                src={movie.posterUrl} 
                alt={movie.title}
                className="img-fluid rounded shadow"
                style={{ maxHeight: '450px' }}
              />
            </div>
            <div className="col-md-8">
              <h1 className="display-4 fw-bold mb-2">{movie.title}</h1>
              
              <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                <span className="badge bg-primary">{movie.mpaaRating}</span>
                <span className="text-light">{movie.duration} min</span>
                <div className="vr bg-light opacity-25 d-none d-sm-block" style={{ width: '1px', height: '20px' }}></div>
                <span>{movie.releaseDate}</span>
                <div className="vr bg-light opacity-25 d-none d-sm-block" style={{ width: '1px', height: '20px' }}></div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-star-fill text-warning me-1"></i>
                  <span>{movie.rating}/10</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="mb-2">
                  <span className="fw-bold me-2">Director:</span>
                  <span>{movie.director}</span>
                </div>
                <div className="mb-2">
                  <span className="fw-bold me-2">Cast:</span>
                  <span>{movie.cast?.join(', ')}</span>
                </div>
                <div className="mb-4">
                  <span className="fw-bold me-2">Genre:</span>
                  <span>{movie.genres?.join(', ')}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h5 className="fw-bold mb-2">Synopsis</h5>
                <p className="lead">{movie.description}</p>
              </div>
              
              <div className="d-flex gap-2">
                <button className="btn btn-primary">
                  <i className="bi bi-play-fill me-2"></i>
                  Watch Trailer
                </button>
                <button className="btn btn-outline-light">
                  <i className="bi bi-share me-2"></i>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Showtimes Section */}
      <div className="py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold mb-4">Showtimes</h2>
          
          {/* Date Pills */}
          <div className="mb-4">
            <ul className="nav nav-pills">
              {Object.keys(showtimesByDate).map((date, index) => (
                <li className="nav-item me-2 mb-2" key={date}>
                  <button 
                    className={`nav-link ${selectedDate === date ? 'active' : ''}`}
                    onClick={() => setSelectedDate(date)}
                  >
                    {formatDate(date)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Showtimes for Selected Date */}
          {selectedDate && showtimesByDate[selectedDate] && (
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h5 className="card-title mb-4">Available Times for {formatDate(selectedDate)}</h5>
                
                <div className="d-flex flex-wrap gap-2">
                  {showtimesByDate[selectedDate].map((showtime) => (
                    <Link 
                      key={showtime.id}
                      to={`/booking/${movie.id}/${showtime.id}`}
                      className="btn btn-outline-primary"
                    >
                      {showtime.time}
                      {showtime.format && <span className="ms-2 badge bg-info">{showtime.format}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {(!selectedDate || !showtimesByDate[selectedDate]) && (
            <div className="alert alert-warning">
              No showtimes available for the selected date.
            </div>
          )}
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">Reviews</h2>
            <button className="btn btn-outline-primary">
              Write a Review
            </button>
          </div>
          
          {movie.reviews && movie.reviews.length > 0 ? (
            <div className="row">
              {movie.reviews.slice(0, 3).map((review, index) => (
                <div className="col-md-4 mb-4" key={index}>
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex align-items-center">
                          <div className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '40px', height: '40px' }}>
                            {review.author.charAt(0)}
                          </div>
                          <div>
                            <h6 className="mb-0">{review.author}</h6>
                            <div className="text-muted small">{review.date}</div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-star-fill text-warning me-1"></i>
                          <span>{review.rating}/10</span>
                        </div>
                      </div>
                      <p className="card-text">{review.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-light text-center">
              No reviews available for this movie yet. Be the first to write one!
            </div>
          )}
          
          {movie.reviews && movie.reviews.length > 3 && (
            <div className="text-center mt-3">
              <button className="btn btn-outline-secondary">
                View All Reviews
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Recommended Movies */}
      {movie.recommendations && movie.recommendations.length > 0 && (
        <div className="py-5 bg-light">
          <div className="container">
            <h2 className="fw-bold mb-4">You May Also Like</h2>
            
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {movie.recommendations.map((rec, index) => (
                <div className="col" key={index}>
                  <div className="card h-100 shadow">
                    <img 
                      src={rec.posterUrl}
                      className="card-img-top"
                      style={{ height: "300px", objectFit: "cover" }}
                      alt={rec.title}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{rec.title}</h5>
                      <p className="card-text text-muted small mb-3">
                        {rec.genres.join(', ')}
                      </p>
                      <div className="mt-auto">
                        <Link to={`/movie/${rec.id}`} className="btn btn-outline-primary w-100">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailPage;