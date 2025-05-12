// src/components/SeatSelection.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { selectSeats } from '../redux/actions/bookingActions';

const SeatSelection = ({ showtime, pricing }) => {
  const dispatch = useDispatch();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  
  const seatRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 12;
  
    const reservedSeats = showtime?.reservedSeats || ['A3', 'A4', 'D5', 'D6', 'D7', 'G10', 'G11'];

  useEffect(() => {
     const price = selectedSeats.length * (pricing?.standard || 12);
    setTotalPrice(price);
    
    // Update Redux store
    dispatch(selectSeats(selectedSeats, price));
  }, [selectedSeats, pricing, dispatch]);

  const handleSeatClick = (seatId) => {
    if (reservedSeats.includes(seatId)) {
      return; // Seat is already reserved
    }
    
    setSelectedSeats(prevSelected => {
      if (prevSelected.includes(seatId)) {
        // Deselect the seat
        return prevSelected.filter(seat => seat !== seatId);
      } else {
        // Select the seat
        return [...prevSelected, seatId];
      }
    });
  };

  const getSeatStatus = (seatId) => {
    if (reservedSeats.includes(seatId)) {
      return 'reserved';
    }
    if (selectedSeats.includes(seatId)) {
      return 'selected';
    }
    return 'available';
  };

  const getSeatClasses = (status) => {
    const baseClasses = "btn m-1 seat-btn";
    
    switch (status) {
      case 'available':
        return `${baseClasses} btn-outline-secondary`;
      case 'reserved':
        return `${baseClasses} btn-secondary disabled`;
      case 'selected':
        return `${baseClasses} btn-primary`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className="seat-selection-container">
      <div className="text-center mb-5">
        <div className="bg-light py-3 mb-4">
          <h5 className="mb-0">SCREEN</h5>
        </div>
        
        <div className="mb-4">
          {seatRows.map(row => (
            <div className="d-flex justify-content-center" key={row}>
              <div className="seat-row-label me-2 d-flex align-items-center fw-bold">
                {row}
              </div>
              <div className="d-flex flex-wrap justify-content-center">
                {[...Array(seatsPerRow)].map((_, index) => {
                  const seatNumber = index + 1;
                  const seatId = `${row}${seatNumber}`;
                  const status = getSeatStatus(seatId);
                  
                  return (
                    <button
                      key={seatId}
                      className={getSeatClasses(status)}
                      onClick={() => handleSeatClick(seatId)}
                      style={{ width: "40px", height: "40px" }}
                      disabled={status === 'reserved'}
                      aria-label={`Seat ${seatId}, status: ${status}`}
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="d-flex justify-content-center gap-4 mb-4">
          <div className="d-flex align-items-center">
            <div className="btn btn-outline-secondary disabled me-2" style={{ width: "30px", height: "30px" }}></div>
            <span>Available</span>
          </div>
          <div className="d-flex align-items-center">
            <div className="btn btn-primary disabled me-2" style={{ width: "30px", height: "30px" }}></div>
            <span>Selected</span>
          </div>
          <div className="d-flex align-items-center">
            <div className="btn btn-secondary disabled me-2" style={{ width: "30px", height: "30px" }}></div>
            <span>Reserved</span>
          </div>
        </div>
      </div>
      
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Booking Summary</h5>
          <div className="d-flex justify-content-between mb-2">
            <span>Selected Seats:</span>
            <span>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Price per Seat:</span>
            <span>${pricing?.standard || 12}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between fw-bold">
            <span>Total Price:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;