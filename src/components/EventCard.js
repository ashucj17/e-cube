import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  // Destructure event properties with fallbacks
  const { 
    id, 
    title, 
    image, 
    date, 
    venue, 
    category,
    price 
  } = event || {};

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="relative">
        <img 
          src={image || '/api/placeholder/400/225'} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
          {category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <div className="flex items-center mb-2 text-gray-600">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span>{date}</span>
        </div>
        <div className="flex items-center mb-3 text-gray-600">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span>{venue}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="font-bold text-lg">${price}</div>
          <Link
            to={`/event/${id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Get Tickets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;