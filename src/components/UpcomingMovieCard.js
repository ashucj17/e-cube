import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUpcomingMovies } from '../redux/actions/movieActions';
import MovieList from '../components/MovieList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const UpcomingMoviesPage = () => {
  const dispatch = useDispatch();
  const { upcomingMovies, loading, error } = useSelector(state => state.movies);
  
  useEffect(() => {
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);
  
  console.log('Movies State:', useSelector(state => state.movies));
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <div className="upcoming-movies-page">
      <h1>Upcoming Movies</h1>
      {upcomingMovies && upcomingMovies.length > 0 ? (
        <MovieList movies={upcomingMovies} />
      ) : (
        <p>No upcoming movies found.</p>
      )}
    </div>
  );
};

export default UpcomingMoviesPage;