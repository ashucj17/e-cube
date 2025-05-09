import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SeatSelection from '../components/SeatSelection';
import { getMovieDetails } from '../redux/actions/movieActions';
import { bookTickets } from '../redux/actions/bookingActions';

const BookingPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { selectedMovie, loading } = useSelector(state => state.movies);
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showtime, setShowtime] = useState('');
  const [date, setDate] = useState('');
  const [ticketCount, setTicketCount] = useState({
    adult: 0,
    child: 0,
    senior: 0
  });
  
  // Define ticket prices
  const ticketPrices = {
    adult: 12.99,
    child: 8.99,
    senior: 10.99
  };
  
  // Calculate total price
  const calculateTotal = () => {
    return Object.entries(ticketCount).reduce((total, [type, count]) => {
      return total + (count * ticketPrices[type]);
    }, 0);
  };

  useEffect(() => {
    dispatch(getMovieDetails(movieId));
  }, [dispatch, movieId]);
  
  useEffect(() => {
    // Reset selected seats if ticket count changes
    setSelectedSeats([]);
  }, [ticketCount, ticketPrices]);
  
  const totalTickets = Object.values(ticketCount).reduce((sum, count) => sum + count, 0);
  
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  
  const handleShowtimeChange = (e) => {
    setShowtime(e.target.value);
  };
  
  const handleTicketChange = (type, value) => {
    setTicketCount({
      ...ticketCount,
      [type]: Math.max(0, value)
    });
  };
  
  const handleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else if (selectedSeats.length < totalTickets) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };
  
  const handleBooking = () => {
    if (selectedSeats.length !== totalTickets) {
      alert(`Please select exactly ${totalTickets} seats.`);
      return;
    }
    
    if (!date || !showtime) {
      alert('Please select a date and showtime.');
      return;
    }
    
    const bookingData = {
      movieId,
      movieTitle: selectedMovie.title,
      date,
      showtime,
      seats: selectedSeats,
      tickets: ticketCount,
      totalPrice: calculateTotal(),
      bookingTime: new Date().toISOString()
    };
    
    dispatch(bookTickets(bookingData));
    navigate(`/ticket/${movieId}`);
  };
  
  if (loading) {
    return <div className="container-custom py-10 text-center">Loading...</div>;
  }
  
  if (!selectedMovie) {
    return <div className="container-custom py-10 text-center">Movie not found</div>;
  }

  const availableDates = [
    { value: '2025-05-09', label: 'May 9, 2025' },
    { value: '2025-05-10', label: 'May 10, 2025' },
    { value: '2025-05-11', label: 'May 11, 2025' },
    { value: '2025-05-12', label: 'May 12, 2025' },
  ];
  
  const availableShowtimes = [
    { value: '10:00', label: '10:00 AM' },
    { value: '13:00', label: '1:00 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '19:00', label: '7:00 PM' },
    { value: '22:00', label: '10:00 PM' },
  ];

  return (
    <div className="container-custom py-8">
      <h1>Book Tickets: {selectedMovie.title}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Movie info */}
        <div className="lg:col-span-1">
          <div className="card">
            <img 
              src={selectedMovie.posterUrl || '/api/placeholder/300/450'} 
              alt={selectedMovie.title}
              className="w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{selectedMovie.title}</h3>
              <div className="flex items-center mt-2">
                <span className={`movie-rating rating-${selectedMovie.rating?.toLowerCase() || 'pg'}`}>
                  {selectedMovie.rating || 'PG'}
                </span>
                <span className="ml-2 text-gray-600">{selectedMovie.runtime || '120'} min</span>
              </div>
              <div className="mt-4 text-gray-700">
                <p><strong>Director:</strong> {selectedMovie.director || 'N/A'}</p>
                <p><strong>Cast:</strong> {selectedMovie.cast?.join(', ') || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Booking form */}
        <div className="lg:col-span-2">
          {/* Date and time selection */}
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Select Date & Time</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="date" className="form-label">Date</label>
                <select 
                  id="date" 
                  className="form-input" 
                  value={date} 
                  onChange={handleDateChange}
                >
                  <option value="">Select date</option>
                  {availableDates.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="showtime" className="form-label">Showtime</label>
                <select 
                  id="showtime" 
                  className="form-input" 
                  value={showtime} 
                  onChange={handleShowtimeChange}
                  disabled={!date}
                >
                  <option value="">Select showtime</option>
                  {availableShowtimes.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Ticket selection */}
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Select Tickets</h2>
            
            {Object.entries(ticketPrices).map(([type, price]) => (
              <div key={type} className="flex items-center justify-between py-2 border-b border-gray-200">
                <div>
                  <span className="font-medium capitalize">{type}</span>
                  <span className="text-gray-600 ml-2">${price.toFixed(2)}</span>
                </div>
                <div className="flex items-center">
                  <button 
                    className="btn-secondary h-8 w-8 flex items-center justify-center p-0"
                    onClick={() => handleTicketChange(type, ticketCount[type] - 1)}
                  >
                    -
                  </button>
                  <span className="mx-3 w-6 text-center">{ticketCount[type]}</span>
                  <button 
                    className="btn-secondary h-8 w-8 flex items-center justify-center p-0"
                    onClick={() => handleTicketChange(type, ticketCount[type] + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            
            <div className="mt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Please select {totalTickets} {totalTickets === 1 ? 'seat' : 'seats'} on the seating chart below
              </p>
            </div>
          </div>
          
          {/* Seat selection */}
          {totalTickets > 0 && (
            <div className="card p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Select Seats</h2>
              <SeatSelection 
                selectedSeats={selectedSeats}
                onSeatSelect={handleSeatSelection}
                maxSeats={totalTickets}
              />
              <div className="mt-4 flex justify-between items-center">
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <div className="seat-available w-5 h-5"></div>
                    <span className="ml-2 text-sm">Available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="seat-selected w-5 h-5"></div>
                    <span className="ml-2 text-sm">Selected</span>
                  </div>
                  <div className="flex items-center">
                    <div className="seat-reserved w-5 h-5"></div>
                    <span className="ml-2 text-sm">Reserved</span>
                  </div>
                </div>
                <div>
                  <span className="text-sm">
                    Selected: {selectedSeats.length}/{totalTickets}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {/* Booking button */}
          <div className="flex justify-end">
            <button 
              className="btn-primary"
              onClick={handleBooking}
              disabled={!date || !showtime || selectedSeats.length !== totalTickets}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;