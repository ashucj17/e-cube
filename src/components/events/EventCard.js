import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ event }) => {
  const { id, title, image, date, time, description, ticketsAvailable, price } = event;
  
  // Format the date nicely
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Check if event is happening soon (within the next 3 days)
  const isUpcoming = () => {
    const eventDate = new Date(date);
    const today = new Date();
    const threeDaysLater = new Date(today);
    threeDaysLater.setDate(today.getDate() + 3);
    
    return eventDate <= threeDaysLater && eventDate >= today;
  };
  
  // Check if event is sold out
  const isSoldOut = ticketsAvailable === 0;

  return (
    <div className="event-card">
      {isUpcoming() && !isSoldOut && (
        <div className="event-badge upcoming">Coming Soon!</div>
      )}
      {isSoldOut && (
        <div className="event-badge sold-out">Sold Out</div>
      )}
      
      <div className="event-image-container">
        <img src={image} alt={title} className="event-image" />
      </div>
      
      <div className="event-content">
        <h3 className="event-title">{title}</h3>
        
        <div className="event-details">
          <div className="event-detail">
            <i className="fa fa-calendar"></i>
            <span>{formatDate(date)}</span>
          </div>
          <div className="event-detail">
            <i className="fa fa-clock-o"></i>
            <span>{time}</span>
          </div>
          <div className="event-detail">
            <i className="fa fa-ticket"></i>
            <span>
              {isSoldOut 
                ? 'No tickets available' 
                : `${ticketsAvailable} tickets left`}
            </span>
          </div>
          <div className="event-detail">
            <i className="fa fa-money"></i>
            <span>${price.toFixed(2)}</span>
          </div>
        </div>
        
        <p className="event-description">{description.length > 100 
          ? `${description.substring(0, 100)}...` 
          : description}
        </p>
        
        <div className="event-actions">
          <Link 
            to={`/events/${id}`} 
            className="event-details-btn"
          >
            View Details
          </Link>
          
          <Link 
            to={isSoldOut ? '#' : `/booking/event/${id}`}
            className={`event-book-btn ${isSoldOut ? 'disabled' : ''}`}
            onClick={(e) => isSoldOut && e.preventDefault()}
          >
            {isSoldOut ? 'Sold Out' : 'Book Tickets'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;