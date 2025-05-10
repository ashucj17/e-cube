import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../redux/actions/eventActions';
import EventCard from '../components/EventCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const EventsPage = () => {
  const dispatch = useDispatch();
  
  // Get the full events state and log it for debugging
  const eventsState = useSelector(state => state.events);
  console.log('Events State:', eventsState);
  
  // Extract data with fallbacks to prevent undefined errors
  const events = eventsState?.items || eventsState?.events || [];
  const loading = eventsState?.loading || false;
  const error = eventsState?.error || null;
  
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Add safety check before filtering
  const filteredEvents = filter === 'all' 
    ? events 
    : Array.isArray(events) ? events.filter(event => event.category === filter) : [];

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
              onClick={() => dispatch(fetchEvents())}
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
        <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
        
        {/* Filter Controls */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              All Events
            </button>
            <button 
              onClick={() => setFilter('concert')}
              className={`px-4 py-2 rounded ${filter === 'concert' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Concerts
            </button>
            <button 
              onClick={() => setFilter('sports')}
              className={`px-4 py-2 rounded ${filter === 'sports' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Sports
            </button>
            <button 
              onClick={() => setFilter('theater')}
              className={`px-4 py-2 rounded ${filter === 'theater' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Theater
            </button>
          </div>
        </div>
        
        {/* Events Grid */}
        {Array.isArray(filteredEvents) && filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard key={event.id || Math.random()} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No events found in this category.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default EventsPage;