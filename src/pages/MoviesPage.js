import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/actions/movieActions';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';

const MoviesPage = () => {
  const dispatch = useDispatch();
  const { loading, movies, error } = useSelector((state) => state.movies);
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('');

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  // Filter movies based on search term and genre
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = !genreFilter || (movie.genre_ids && movie.genre_ids.includes(parseInt(genreFilter)));
    return matchesSearch && matchesGenre;
  });

  // Dummy genre list (would ideally come from API)
  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 18, name: 'Drama' },
    { id: 14, name: 'Fantasy' },
    { id: 27, name: 'Horror' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 53, name: 'Thriller' }
  ];

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-danger">Error: {error}</div>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Movies</h2>
      
      {/* Search and Filter */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <input
            type="text"
            className="form-control"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select 
            className="form-select"
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Movies Grid */}
      {filteredMovies.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {filteredMovies.map((movie) => (
            <div className="col" key={movie.id}>
              <Link to={`/movie/${movie.id}`} className="text-decoration-none">
                <MovieCard movie={movie} />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <p>No movies found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;