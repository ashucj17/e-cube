import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Placeholder action for getting event details
const getEventDetails = (id) => {
  return {
    type: 'GET_EVENT_DETAILS',
    payload: {
      id,
      title: 'Summer Music Festival',
      date: '2025-06-15T19:00:00',
      endDate: '2025-06-15T23:00:00',
      location: 'Central Park, New York',
      address: '14 E 60th St, New York, NY 10022',
      image: 'https://via.placeholder.com/1200x600?text=Summer+Music+Festival',
      category: 'Music',
      price: '$75',
      description: 'Join us for an unforgettable night of music under the stars. Featuring top artists from around the world, this summer festival promises to be the highlight of the season. Enjoy food vendors, art installations, and much more!',
      organizer: 'NYC Events Co.',
      contactEmail: 'info@nycevents.com',
      contactPhone: '(123) 456-7890',
      featured: true
    }
  };
};

const EventDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // Using placeholder data since we don't have the full reducer setup
  const { loading, selectedEvent: event, error } = useSelector((state) => state.events || {
    loading: false,
    error: null,
    selectedEvent: null
  });

  useEffect(() => {
    if (id) {
      dispatch(getEventDetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-danger">Error: {error}</div>;
  }

  if (!event) {
    return <div className="text-center py-5">Event not found</div>;
  }

  // Format date and time
  const formatDateTime = (dateString) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/events">Events</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{event.title}</li>
        </ol>
      </nav>

      <div className="row mb-4">
        <div className="col-md-8">
          <img 
            src={event.image} 
            alt={event.title} 
            className="img-fluid rounded shadow-sm mb-4"
          />
          
          <h2 className="mb-3">{event.title}</h2>
          
          <div className="mb-4">
            <span className="badge bg-primary me-2">{event.category}</span>
            {event.featured && <span className="badge bg-warning text-dark">Featured</span>}
          </div>
          
          <h5>Description</h5>
          <p className="mb-4">{event.description}</p>
          
          <h5>Organizer</h5>
          <p>{event.organizer}</p>
          
          <h5>Contact Information</h5>
          <p className="mb-1">Email: {event.contactEmail}</p>
          <p>Phone: {event.contactPhone}</p>
        </div>
        
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">Event Details</h5>
              
              <div className="mb-3">
                <i className="bi bi-calendar me-2"></i>
                <strong>Date & Time:</strong>
                <p className="mb-0">{formatDateTime(event.date)}</p>
                <p className="text-muted small">to {formatDateTime(event.endDate)}</p>
              </div>
              
              <div className="mb-3">
                <i className="bi bi-geo-alt me-2"></i>
                <strong>Location:</strong>
                <p className="mb-0">{event.location}</p>
                <p className="text-muted small">{event.address}</p>
              </div>
              
              <div className="mb-4">
                <i className="bi bi-tag me-2"></i>
                <strong>Price:</strong>
                <p>{event.price}</p>
              </div>
              
              <Link to={`/booking/${event.id}`} className="btn btn-primary w-100">
                Book Tickets
              </Link>
            </div>
          </div>
          
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Share This Event</h5>
              <div className="d-flex justify-content-around mt-3">
                <button className="btn btn-outline-primary"><i className="bi bi-facebook"></i></button>
                <button className="btn btn-outline-info"><i className="bi bi-twitter"></i></button>
                <button className="btn btn-outline-danger"><i className="bi bi-instagram"></i></button>
                <button className="btn btn-outline-secondary"><i className="bi bi-link-45deg"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;