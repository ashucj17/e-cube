import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpcomingMovies } from '../redux/actions/movieActions';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';

const UpcomingMoviesPage = () => {
  const dispatch = useDispatch();
  const { loading, upcomingMovies, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-danger">Error: {error}</div>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Upcoming Movies</h2>
      
      {upcomingMovies && upcomingMovies.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {upcomingMovies.map((movie) => (
            <div className="col" key={movie.id}>
              <Link to={`/movie/${movie.id}`} className="text-decoration-none">
                <MovieCard movie={movie} />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No upcoming movies available.</p>
      )}
    </div>
  );
};

export default UpcomingMoviesPage;