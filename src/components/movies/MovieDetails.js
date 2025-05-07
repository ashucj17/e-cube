import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails } from '../../actions/movieActions';
import Loading from '../common/Loading';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: movie, loading, error } = useSelector(state => state.movies.selectedMovie);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(id));
    }
  }, [dispatch, id]);

  const handleBooking = () => {
    navigate(`/booking/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="error">
        <p>Error loading movie details: {error}</p>
      </div>
    );
  }

  if (!movie) {
    return <div className="movie-details-container">
      <p>No movie details available.</p>
    </div>;
  }

  return (
    <div className="movie-details-container">
      <div className="movie-details-header">
        <div className="movie-details-poster">
          <img src={movie.image} alt={movie.name} />
        </div>
        <div className="movie-details-info">
          <h1 className="movie-title">{movie.name}</h1>
          <div className="movie-meta">
            <span className="movie-rating">{movie.rate}/10</span>
            <span className="movie-language">{movie.language}</span>
            <span className="movie-type">{movie.type}</span>
          </div>
          <div className="movie-description">
            <p>{movie.description || 'No description available.'}</p>
          </div>
          <div className="movie-details">
            <p><strong>Director:</strong> {movie.director || 'Not specified'}</p>
            <p><strong>Cast:</strong> {movie.cast?.join(', ') || 'Not specified'}</p>
            <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
          </div>
          <button className="btn book-btn" onClick={handleBooking}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;