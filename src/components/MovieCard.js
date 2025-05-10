// src/components/MovieCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="card h-100 shadow">
      <div className="position-relative">
        <img 
          src={movie.posterUrl} 
          className="card-img-top" 
          style={{ height: "300px", objectFit: "cover" }}
          alt={movie.title} 
        />
        <span className="position-absolute top-0 end-0 badge bg-primary m-2">
          {movie.rating}
        </span>
      </div>
      
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{movie.title}</h5>
        <div className="mb-2 d-flex gap-2">
          {movie.genres.map((genre, index) => (
            <span key={index} className="badge bg-secondary">
              {genre}
            </span>
          ))}
        </div>
        <p className="card-text text-muted small mb-2">
          <i className="bi bi-clock me-1"></i>
          {movie.duration} min
        </p>
        <p className="card-text mb-3">
          {movie.description.length > 100 
            ? `${movie.description.substring(0, 100)}...` 
            : movie.description}
        </p>
        
        <div className="mt-auto">
          <Link 
            to={`/movie/${movie.id}`} 
            className="btn btn-primary w-100"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;