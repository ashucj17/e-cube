import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails, selectSeats, completeBooking } from '../../actions/movieActions';
import Loading from '../common/Loading';
import './TicketBooking.css';

const TicketBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { data: movie, loading: movieLoading, error: movieError } = useSelector(state => state.movies.selectedMovie);
  // Using destructuring with rename to avoid the unused variable warning
  const { seats: selectedSeats } = useSelector(state => state.movies.booking);
  
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [seats, setSeats] = useState([]);
  const [ticketType, setTicketType] = useState('standard');
  const [totalSeats, setTotalSeats] = useState(0);
  const [price, setPrice] = useState(0);
  
  const availableDates = [
    new Date().toISOString().split('T')[0],
    new Date(Date.now() + 86400000).toISOString().split('T')[0],
    new Date(Date.now() + (2 * 86400000)).toISOString().split('T')[0],
    new Date(Date.now() + (3 * 86400000)).toISOString().split('T')[0],
  ];
  
  const availableTimes = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'];
  
  // Use useMemo to prevent ticketPrices from being recreated on every render
  const ticketPrices = useMemo(() => ({
    standard: 10,
    premium: 15,
    vip: 20
  }), []);
  
  // Generate a 5x10 seat layout
  useEffect(() => {
    const seatRows = [];
    const letters = ['A', 'B', 'C', 'D', 'E'];
    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 1; j <= 10; j++) {
        row.push({
          id: `${letters[i]}${j}`,
          booked: Math.random() < 0.3, // Randomly mark some seats as booked
          selected: false
        });
      }
      seatRows.push(row);
    }
    setSeats(seatRows);
  }, [id]);
  
  useEffect(() => {
    if (id && !movie) {
      dispatch(fetchMovieDetails(id));
    }
  }, [dispatch, id, movie]);
  
  // Calculate price when selections change
  useEffect(() => {
    const newPrice = totalSeats * ticketPrices[ticketType];
    setPrice(newPrice);
    
    // Keep track of selected seats
    const selectedSeatsArray = [];
    seats.forEach(row => {
      row.forEach(seat => {
        if (seat.selected) {
          selectedSeatsArray.push(seat.id);
        }
      });
    });
    
    dispatch(selectSeats(selectedSeatsArray, newPrice));
  }, [seats, totalSeats, ticketType, dispatch, ticketPrices]);
  
  const toggleSeatSelection = (rowIndex, seatIndex) => {
    const newSeats = [...seats];
    const seat = newSeats[rowIndex][seatIndex];
    
    if (!seat.booked) {
      seat.selected = !seat.selected;
      setSeats(newSeats);
      
      // Count total selected seats
      let count = 0;
      newSeats.forEach(row => {
        row.forEach(s => {
          if (s.selected) count++;
        });
      });
      setTotalSeats(count);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!date || !time || totalSeats === 0) {
      alert('Please select date, time and at least one seat');
      return;
    }
    
    const ticketDetails = {
      movieId: id,
      movieName: movie?.name,
      date,
      time,
      seats: selectedSeats,
      ticketType,
      totalPrice: price,
      quantity: totalSeats,
      posterImage: movie?.image
    };
    
    dispatch(completeBooking(ticketDetails));
    navigate('/ticket');
  };
  
  if (movieLoading) {
    return <Loading />;
  }
  
  if (movieError) {
    return <div className="error">Error loading movie details: {movieError}</div>;
  }
  
  if (!movie) {
    return <div className="error">Movie not found</div>;
  }
  
  return (
    <div className="ticket-booking-container">
      <h2 className="section-title">Book Tickets for {movie.name}</h2>
      
      <div className="booking-content">
        <div className="movie-summary">
          <img src={movie.image} alt={movie.name} className="movie-poster" />
          <div className="movie-info">
            <h3>{movie.name}</h3>
            <p><strong>Language:</strong> {movie.language}</p>
            <p><strong>Type:</strong> {movie.type}</p>
            <p><strong>Rating:</strong> {movie.rate}/10</p>
          </div>
        </div>
        
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="date">Select Date:</label>
            <select 
              id="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              required
            >
              <option value="">Select a date</option>
              {availableDates.map(date => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="time">Select Time:</label>
            <select 
              id="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
              required
            >
              <option value="">Select a time</option>
              {availableTimes.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="ticket-type">Ticket Type:</label>
            <select 
              id="ticket-type" 
              value={ticketType} 
              onChange={(e) => setTicketType(e.target.value)}
            >
              <option value="standard">Standard (${ticketPrices.standard})</option>
              <option value="premium">Premium (${ticketPrices.premium})</option>
              <option value="vip">VIP (${ticketPrices.vip})</option>
            </select>
          </div>
          
          <div className="seat-selection">
            <h3>Select Your Seats</h3>
            <div className="screen">Screen</div>
            
            <div className="seat-layout">
              {seats.map((row, rowIndex) => (
                <div key={rowIndex} className="seat-row">
                  {row.map((seat, seatIndex) => (
                    <div
                      key={seat.id}
                      className={`seat ${seat.booked ? 'booked' : ''} ${seat.selected ? 'selected' : ''}`}
                      onClick={() => toggleSeatSelection(rowIndex, seatIndex)}
                      title={seat.booked ? 'Already booked' : seat.id}
                    >
                      {seat.id}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            <div className="seat-legend">
              <div className="legend-item">
                <div className="seat"></div>
                <span>Available</span>
              </div>
              <div className="legend-item">
                <div className="seat selected"></div>
                <span>Selected</span>
              </div>
              <div className="legend-item">
                <div className="seat booked"></div>
                <span>Booked</span>
              </div>
            </div>
          </div>
          
          <div className="booking-summary">
            <h3>Booking Summary</h3>
            <p><strong>Selected Seats:</strong> {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</p>
            <p><strong>Ticket Type:</strong> {ticketType.charAt(0).toUpperCase() + ticketType.slice(1)}</p>
            <p><strong>Price per Ticket:</strong> ${ticketPrices[ticketType]}</p>
            <p><strong>Total Seats:</strong> {totalSeats}</p>
            <p className="total-price"><strong>Total Price:</strong> ${price}</p>
          </div>
          
          <button 
            type="submit"
            className="btn book-tickets-btn"
            disabled={totalSeats === 0 || !date || !time}
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketBooking;