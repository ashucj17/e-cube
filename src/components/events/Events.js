import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../actions/eventActions';
import EventCard from './EventCard';
import Loading from '../common/Loading';
import './Events.css';

const Events = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector(state => state.events);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredEvents = () => {
    if (filter === 'all') return events;
    
    const today = new Date();
    if (filter === 'upcoming') {
      return events.filter(event => new Date(event.date) > today);
    } else if (filter === 'today') {
      return events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === today.toDateString();
      });
    } else if (filter === 'thisWeek') {
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      return events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= nextWeek;
      });
    }
    return events;
  };

  if (loading) return <Loading />;
  
  if (error) return <div className="events-error">Error loading events: {error}</div>;

  return (
    <div className="events-container">
      <h1 className="events-title">Special Events</h1>
      <p className="events-subtitle">Exclusive movie premieres, themed nights, and special screenings</p>
      
      <div className="events-filter">
        <label htmlFor="event-filter">Filter by: </label>
        <select 
          id="event-filter" 
          value={filter} 
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="all">All Events</option>
          <option value="today">Today</option>
          <option value="thisWeek">This Week</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>

      {filteredEvents().length === 0 ? (
        <div className="no-events">No events found for the selected filter.</div>
      ) : (
        <div className="events-grid">
          {filteredEvents().map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;