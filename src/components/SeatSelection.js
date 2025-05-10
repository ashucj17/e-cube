import React from 'react';
import PropTypes from 'prop-types';

const SeatSelection = ({ selectedSeats, onSeatSelect, maxSeats }) => {
  // Generate a sample theater layout
  const generateTheaterLayout = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 10;
    const layout = [];
    
    // For demo purposes, pre-mark some seats as reserved
    const reservedSeats = ['A3', 'A4', 'B5', 'C7', 'C8', 'D1', 'D2', 'E5', 'F3', 'F4', 'G8', 'H9', 'H10'];
    
    for (const row of rows) {
      const seats = [];
      for (let i = 1; i <= seatsPerRow; i++) {
        const seatId = `${row}${i}`;
        const isReserved = reservedSeats.includes(seatId);
        const isSelected = selectedSeats.includes(seatId);

        let seatClass;
        if (isReserved) {
          seatClass = 'seat-reserved';
        } else if (isSelected) {
          seatClass = 'seat-selected';
        } else {
          seatClass = 'seat-available';
        }
        
        seats.push({
          id: seatId,
          reserved: isReserved,
          selected: isSelected,
          className: seatClass
        });
      }
      layout.push({ row, seats });
    }
    
    return layout;
  };
  
  const handleSeatClick = (seatId, isReserved) => {
    if (isReserved) return;
    
    // If seat is already selected, remove it
    if (selectedSeats.includes(seatId)) {
      onSeatSelect(seatId);
      return;
    }
    
    // Check if we've reached the maximum number of seats
    if (selectedSeats.length >= maxSeats) {
      // If we're at max, don't allow more selections
      alert(`You can only select ${maxSeats} seats.`);
      return;
    }
    
    onSeatSelect(seatId);
  };
  
  const theaterLayout = generateTheaterLayout();
  
  return (
    <div className="seat-selection">
      <div className="screen bg-gray-300 h-8 rounded-t-lg mb-6 flex items-center justify-center text-sm text-gray-600">
        Screen
      </div>
      
      <div className="seats-container mb-6">
        {theaterLayout.map(({ row, seats }) => (
          <div key={row} className="flex justify-center mb-2">
            <span className="w-6 font-semibold flex items-center justify-center">{row}</span>
            <div className="flex">
              {seats.map((seat) => (
                <div
                  key={seat.id}
                  className={seat.className}
                  onClick={() => handleSeatClick(seat.id, seat.reserved)}
                >
                  {seat.id.substring(1)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

SeatSelection.propTypes = {
  selectedSeats: PropTypes.array.isRequired,
  onSeatSelect: PropTypes.func.isRequired,
  maxSeats: PropTypes.number.isRequired
};

export default SeatSelection;