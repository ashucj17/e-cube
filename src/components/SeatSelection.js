import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectSeats, setTicketType } from '../redux/actions/bookingActions';

const SeatSelection = ({ movie }) => {
  const dispatch = useDispatch();
  const [seats, setSeats] = useState([]);
  const [ticketType, setTicketTypeState] = useState('normal');
  
  const seatRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 8;
  
  const handleSeatClick = (seatId) => {
    if (seats.includes(seatId)) {
      setSeats(seats.filter(id => id !== seatId));
    } else {
      setSeats([...seats, seatId]);
    }
    
    // Update Redux state
    dispatch(selectSeats([...seats, seatId]));
  };
  
  const handleTicketTypeChange = (type) => {
    setTicketTypeState(type);
    dispatch(setTicketType(type));
  };
  
  const renderSeats = () => {
    return seatRows.map(row => (
      <div key={row} className="flex justify-center mb-2">
        <div className="w-8 text-center">{row}</div>
        {Array.from({ length: seatsPerRow }, (_, i) => i + 1).map(num => {
          const seatId = `${row}${num}`;
          const isSelected = seats.includes(seatId);
          
          return (
            <button
              key={seatId}
              className={`w-8 h-8 mx-1 rounded-t-lg ${
                isSelected 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => handleSeatClick(seatId)}
            >
              {num}
            </button>
          );
        })}
      </div>
    ));
  };
  
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Select Your Seats</h3>
      
      <div className="mb-6">
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-md bg-gray-200 h-8 rounded text-center text-gray-700">
            Screen (Front)
          </div>
        </div>
        
        {renderSeats()}
        
        <div className="flex justify-center mt-4 space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 mr-2"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-600 mr-2"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-600 mr-2"></div>
            <span>Reserved</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Select Ticket Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            className={`p-4 border rounded ${
              ticketType === 'normal' 
                ? 'border-blue-600 bg-blue-50' 
                : 'border-gray-300'
            }`}
            onClick={() => handleTicketTypeChange('normal')}
          >
            <h4 className="font-semibold">Normal Seat</h4>
            <p className="text-xl">{movie?.prices?.normal || 200} {movie?.currency || 'THB'}</p>
          </button>
          
          <button
            className={`p-4 border rounded ${
              ticketType === 'superior' 
                ? 'border-blue-600 bg-blue-50' 
                : 'border-gray-300'
            }`}
            onClick={() => handleTicketTypeChange('superior')}
          >
            <h4 className="font-semibold">Superior Seat</h4>
            <p className="text-xl">{movie?.prices?.superior || 300} {movie?.currency || 'THB'}</p>
          </button>
          
          <button
            className={`p-4 border rounded ${
              ticketType === 'sofa' 
                ? 'border-blue-600 bg-blue-50' 
                : 'border-gray-300'
            }`}
            onClick={() => handleTicketTypeChange('sofa')}
          >
            <h4 className="font-semibold">Sofa Seat</h4>
            <p className="text-xl">{movie?.prices?.sofa || 600} {movie?.currency || 'THB'}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;