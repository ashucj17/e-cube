import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetails } from '../redux/actions/movieActions';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, selectedMovie, error } = useSelector((state) => state.movies);

  useEffect(() => {
    if (id) {
      dispatch(getMovieDetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-danger">Error: {error}</div>;
  }

  if (!selectedMovie) {
    return <div className="text-center py-5">Movie not found</div>;
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-4">
          {selectedMovie.poster_path && (
            <img 
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} 
              alt={selectedMovie.title} 
              className="img-fluid rounded shadow"
            />
          )}
        </div>
        <div className="col-md-8">
          <h2 className="mb-3">{selectedMovie.title}</h2>
          <div className="d-flex mb-3">
            <span className="badge bg-primary me-2">{selectedMovie.release_date?.split('-')[0]}</span>
            <span className="badge bg-secondary me-2">{Math.floor(selectedMovie.runtime / 60)}h {selectedMovie.runtime % 60}m</span>
            <span className="badge bg-success">⭐ {selectedMovie.vote_average?.toFixed(1)}/10</span>
          </div>
          <p className="lead">{selectedMovie.tagline}</p>
          <h5>Overview</h5>
          <p>{selectedMovie.overview}</p>
          
          {selectedMovie.genres && (
            <>
              <h5>Genres</h5>
              <div className="mb-3">
                {selectedMovie.genres.map(genre => (
                  <span key={genre.id} className="badge bg-light text-dark me-2">{genre.name}</span>
                ))}
              </div>
            </>
          )}
          
          <button className="btn btn-primary mt-3">Book Tickets</button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;