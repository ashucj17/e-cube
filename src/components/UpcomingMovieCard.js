import React from 'react';

const UpcomingMovieCard = ({ movie }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={movie.image ? `https://image-path/${movie.image}` : '/placeholder.jpg'} 
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
        <p className="text-sm text-gray-600 mb-1">{movie.genre}</p>
        <p className="text-sm text-gray-600 mb-2">Release: {movie.releaseDate}</p>
        <button 
          className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Notify Me
        </button>
      </div>
    </div>
  );
};

export default UpcomingMovieCard;