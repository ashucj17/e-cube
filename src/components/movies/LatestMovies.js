import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLatestMovies } from '../../actions/movieActions';
import MovieCard from './MovieCard';
import Loading from '../common/Loading';
import './MovieList.css';

const LatestMovies = () => {
  const dispatch = useDispatch();
  const { data: movies, loading, error } = useSelector(state => state.movies.latestMovies);

  useEffect(() => {
    dispatch(fetchLatestMovies());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="error">
        <p>Error loading latest movies: {error}</p>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      <h2 className="section-title">Latest Movies</h2>
      <div className="movie-grid">
        {movies && movies.length > 0 ? (
          movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))
        ) : (
          <p className="no-movies">No latest movies available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default LatestMovies;