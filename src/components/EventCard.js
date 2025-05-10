// src/components/EventCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="card h-100 shadow">
      <img 
        src={event.imageUrl} 
        className="card-img-top" 
        style={{ height: "200px", objectFit: "cover" }}
        alt={event.title} 
      />
      
      {event.featured && (
        <div className="position-absolute top-0 start-0 m-2">
          <span className="badge bg-danger">Featured</span>
        </div>
      )}
      
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{event.title}</h5>
        
        <div className="mb-3">
          <div className="d-flex align-items-center text-muted mb-2">
            <i className="bi bi-calendar3 me-2"></i>
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="d-flex align-items-center text-muted">
            <i className="bi bi-clock me-2"></i>
            <span>{event.time}</span>
          </div>
        </div>
        
        <p className="card-text mb-3">
          {event.description.length > 100 
            ? `${event.description.substring(0, 100)}...` 
            : event.description}
        </p>
        
        <div className="mt-auto">
          <div className="d-flex align-items-center justify-content-between">
            <span className="fw-bold">${event.price.toFixed(2)}</span>
            <Link 
              to={`/event/${event.id}`} 
              className="btn btn-outline-primary"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;