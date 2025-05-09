import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpcomingMovies } from '../redux/actions/movieActions';
import UpcomingMovieCard from '../components/UpcomingMovieCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UpcomingMoviesPage = () => {
  const dispatch = useDispatch();
  
  // Get the full movies state and log it for debugging
  const moviesState = useSelector(state => state.movies);
  console.log('Movies State:', moviesState);
  
  // Extract with safety checks
  const upcomingMovies = moviesState?.upcomingItems || moviesState?.upcomingMovies || [];
  const loading = moviesState?.loading || false;
  const error = moviesState?.error || null;
  
  const [selectedGenre, setSelectedGenre] = useState('all');

  useEffect(() => {
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

  // Add safety check before filtering
  const filteredMovies = selectedGenre === 'all'
    ? upcomingMovies
    : Array.isArray(upcomingMovies) 
      ? upcomingMovies.filter(movie => 
          Array.isArray(movie.genres) && movie.genres.includes(selectedGenre)
        )
      : [];

  // Get unique genres with safety check
  const allGenres = Array.isArray(upcomingMovies) 
    ? [...new Set(upcomingMovies.flatMap(movie => 
        Array.isArray(movie.genres) ? movie.genres : []
      ))]
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-red-500 text-center">
            <p className="text-xl font-bold">Oops! Something went wrong.</p>
            <p>{error}</p>
            <button 
              onClick={() => dispatch(fetchUpcomingMovies())}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Coming Soon</h1>
        <p className="text-gray-600 mb-8">Get a sneak peek at these upcoming releases and set reminders</p>
        
        {/* Genre Filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            <button
              onClick={() => setSelectedGenre('all')}
              className={`px-4 py-2 rounded whitespace-nowrap ${
                selectedGenre === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              All Genres
            </button>
            {allGenres.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded whitespace-nowrap ${
                  selectedGenre === genre ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
        
        {/* Movies Grid */}
        {Array.isArray(filteredMovies) && filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map(movie => (
              <UpcomingMovieCard key={movie.id || Math.random()} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">
              {Array.isArray(upcomingMovies) && upcomingMovies.length > 0
                ? 'No movies match the selected genre.'
                : 'No upcoming movies available at this time.'}
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default UpcomingMoviesPage;