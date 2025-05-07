import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpcomingMovies } from '../../actions/movieActions';
import MovieCard from './MovieCard';
import Loading from '../common/Loading';
import './MovieList.css';

const UpcomingMovies = () => {
  const dispatch = useDispatch();
  const { data: movies, loading, error } = useSelector(state => state.movies.upcomingMovies);

  useEffect(() => {
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="error">
        <p>Error loading upcoming movies: {error}</p>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      <h2 className="section-title">Upcoming Movies</h2>
      <div className="movie-grid">
        {movies && movies.length > 0 ? (
          movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} isUpcoming={true} />
          ))
        ) : (
          <p className="no-movies">No upcoming movies available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingMovies;