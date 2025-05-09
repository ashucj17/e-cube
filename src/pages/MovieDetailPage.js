import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMovieDetails } from '../redux/actions/movieActions';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentMovie, loading } = useSelector(state => state.movies);
  
  useEffect(() => {
    dispatch(getMovieDetails(id));
  }, [dispatch, id]);
  
  const handleBooking = () => {
    navigate(`/booking/${id}`);
  };
  
  if (loading || !currentMovie) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 mb-4 md:mb-0">
          <img 
            src={currentMovie.image ? `https://image-path/${currentMovie.image}` : '/placeholder.jpg'} 
            alt={currentMovie.title}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        
        <div className="md:w-2/3 md:pl-8">
          <h1 className="text-3xl font-bold mb-4">{currentMovie.title}</h1>
          
          <div className="mb-6">
            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm mb-2 mr-2">
              {currentMovie.genre}
            </span>
            {currentMovie.duration && (
              <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm mb-2">
                {currentMovie.duration}
              </span>
            )}
          </div>
          
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="text-lg font-semibold">Director</h3>
              <p>{currentMovie.director}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">Cast</h3>
              <p>{currentMovie.stars}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">Plot</h3>
              <p>{currentMovie.plot}</p>
            </div>
          </div>
          
          <button
            onClick={handleBooking}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;