import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie, isUpcoming = false }) => {
  const { _id, name, image, language, type, rate } = movie;

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={image} alt={name} />
        {!isUpcoming && (
          <div className="movie-rating">
            <span>{rate}/10</span>
          </div>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{name}</h3>
        <div className="movie-meta">
          <span className="movie-language">{language}</span>
          <span className="movie-type">{type}</span>
        </div>
        {!isUpcoming ? (
          <Link to={`/movie/${_id}`} className="btn">
            Book Now
          </Link>
        ) : (
          <button className="btn btn-secondary" disabled>
            Coming Soon
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;