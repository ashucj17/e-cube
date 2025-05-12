import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Placeholder event actions - you would need to create these
const fetchEvents = () => {
  return {
    type: 'FETCH_EVENTS_REQUEST'
  };
};

const EventsPage = () => {
  const dispatch = useDispatch();
  // We'll use a placeholder for the events state since it's not defined yet
  const { loading, events, error } = useSelector((state) => state.events || {
    loading: false,
    events: [
      {
        id: '1',
        title: 'Summer Music Festival',
        date: '2025-06-15',
        location: 'Central Park, New York',
        image: 'https://via.placeholder.com/500x300?text=Music+Festival',
        category: 'Music',
        price: '$75'
      },
      {
        id: '2',
        title: 'Tech Conference 2025',
        date: '2025-07-22',
        location: 'Convention Center, San Francisco',
        image: 'https://via.placeholder.com/500x300?text=Tech+Conference',
        category: 'Conference',
        price: '$150'
      },
      {
        id: '3',
        title: 'Food & Wine Expo',
        date: '2025-08-10',
        location: 'Grand Hall, Chicago',
        image: 'https://via.placeholder.com/500x300?text=Food+Expo',
        category: 'Expo',
        price: '$45'
      },
      {
        id: '4',
        title: 'Comedy Night Special',
        date: '2025-06-30',
        location: 'Laugh Factory, Los Angeles',
        image: 'https://via.placeholder.com/500x300?text=Comedy+Night',
        category: 'Entertainment',
        price: '$35'
      }
    ],
    error: null
  });

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-danger">Error: {error}</div>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Upcoming Events</h2>
      
      {/* Categories */}
      <div className="mb-4">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <button className="nav-link active">All</button>
          </li>
          <li className="nav-item">
            <button className="nav-link">Music</button>
          </li>
          <li className="nav-item">
            <button className="nav-link">Conference</button>
          </li>
          <li className="nav-item">
            <button className="nav-link">Expo</button>
          </li>
          <li className="nav-item">
            <button className="nav-link">Entertainment</button>
          </li>
        </ul>
      </div>
      
      {/* Events Grid */}
      {events && events.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {events.map((event) => (
            <div className="col" key={event.id}>
              <div className="card h-100 shadow">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img 
                      src={event.image} 
                      className="img-fluid rounded-start" 
                      alt={event.title}
                      style={{ height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="card-title">{event.title}</h5>
                        <span className="badge bg-primary">{event.category}</span>
                      </div>
                      <p className="card-text">
                        <small className="text-muted">
                          <i className="bi bi-calendar me-2"></i>
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </small>
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          <i className="bi bi-geo-alt me-2"></i>
                          {event.location}
                        </small>
                      </p>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="fw-bold">{event.price}</span>
                        <Link to={`/event/${event.id}`} className="btn btn-sm btn-outline-primary">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <p>No events available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default EventsPage;