import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLatestMovies, getUpcomingMovies } from '../redux/actions/movieActions';
import { getEvents } from '../redux/actions/eventActions';
import MovieCard from '../components/MovieCard';
import EventCard from '../components/EventCard';

const HomePage = () => {
  const dispatch = useDispatch();
  const { latestMovies, loading: moviesLoading } = useSelector(state => state.movies);
  const { events, loading: eventsLoading } = useSelector(state => state.events);
  
  useEffect(() => {
    dispatch(getLatestMovies());
    dispatch(getUpcomingMovies());
    dispatch(getEvents());
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
            {latestMovies.slice(0, 4).map(movie => (
              <MovieCard key={movie._id || movie.id} movie={movie} />
            ))}
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
            {events.slice(0, 3).map(event => (
              <EventCard key={event._id || event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
