import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <div key={movie.id} className="movie-card">
          <Link to={`/movies/${movie.id}`}>
            <div className="movie-poster">
              <img src={`/images/${movie.poster}`} alt={`${movie.title} poster`} 
                   onError={(e) => {e.target.onerror = null; e.target.src="/images/placeholder.jpg"}} />
            </div>
            <div className="movie-info">
              <h3>{movie.title}</h3>
              {movie.rating && <span className="rating">Rating: {movie.rating}/10</span>}
              <span className="release-date">Release: {movie.releaseDate}</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MovieList;