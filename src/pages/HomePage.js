import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies, fetchUpcomingMovies } from '../redux/actions/movieActions';
import { fetchEvents } from '../redux/actions/eventActions';
import MovieCard from '../components/MovieCard';
import EventCard from '../components/EventCard';

const HomePage = () => {
  const dispatch = useDispatch();
  
  // Get the full state to debug
  const moviesState = useSelector(state => state.movies);
  const eventsState = useSelector(state => state.events);
  
  // Add safety checks and fallbacks
  const latestMovies = moviesState?.items || moviesState?.latestMovies || []; // Try both possible property names
  const moviesLoading = moviesState?.loading || false;
  const events = eventsState?.items || eventsState?.events || []; // Try both possible property names
  const eventsLoading = eventsState?.loading || false;
  
  // Log the state to debug
  console.log('Movies State:', moviesState);
  console.log('Events State:', eventsState);
  console.log('Latest Movies:', latestMovies);
  console.log('Events:', events);
  
  useEffect(() => {
    // Dispatch our actions to load data
    dispatch(fetchMovies());
    dispatch(fetchUpcomingMovies());
    dispatch(fetchEvents());
  }, [dispatch]);
  
  return (
    <div>
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Movies</h2>
          <a href="/upcoming" className="text-blue-600 hover:underline">View All</a>
        </div>
        
        {moviesLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Add a check before using slice */}
            {Array.isArray(latestMovies) && latestMovies.length > 0 ? 
              latestMovies.slice(0, 4).map(movie => (
                <MovieCard key={movie._id || movie.id || Math.random()} movie={movie} />
              ))
            : 
              <div className="col-span-4 text-center text-gray-500">No movies available</div>
            }
          </div>
        )}
      </section>
      
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Nearby Events</h2>
          <a href="/events" className="text-blue-600 hover:underline">View All</a>
        </div>
        
        {eventsLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Add a check before using slice */}
            {Array.isArray(events) && events.length > 0 ? 
              events.slice(0, 3).map(event => (
                <EventCard key={event._id || event.id || Math.random()} event={event} />
              ))
            : 
              <div className="col-span-3 text-center text-gray-500">No events available</div>
            }
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;