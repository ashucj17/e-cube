import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import QRCodeTicket from '../components/QRCodeTicket';

const TicketPage = () => {
  const [ticketType] = useState('digital');
  const { booking } = useSelector(state => state.bookings);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  if (!booking) {
    return (
      <div className="container-custom py-10 text-center">
        <h2 className="text-xl">No booking found. Please book a ticket first.</h2>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  const ticketData = {
    id: booking.bookingTime,
    movie: booking.movieTitle,
    date: booking.date,
    time: booking.showtime,
    seats: booking.seats,
    total: booking.totalPrice
  };

  return (
    <div className="container-custom py-10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Your Ticket</h1>
          <p className="text-gray-600">Thank you for your purchase!</p>
        </div>
        
        <div className="ticket mb-6">
          <div className="ticket-header flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{booking.movieTitle}</h2>
              <p className="text-gray-600">{formatDate(booking.date)}</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-semibold">{formatTime(booking.showtime)}</span>
            </div>
          </div>
          
          <div className="ticket-content">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Seats</p>
                <p className="font-medium">{booking.seats.join(', ')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-medium">${booking.totalPrice.toFixed(2)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Ticket Type</p>
                <p className="font-medium capitalize">{Object.entries(booking.tickets)
                  .filter(([_, count]) => count > 0)
                  .map(([type, count]) => `${count} ${type}${count > 1 ? 's' : ''}`)
                  .join(', ')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Booking Reference</p>
                <p className="font-medium">{booking.bookingTime.slice(0, 10)}</p>
              </div>
            </div>
          </div>
          
          <div className="ticket-footer flex justify-center">
            <QRCodeTicket ticketData={ticketData} />
          </div>
        </div>
        
        <div className="text-center space-y-4">
          <button className="btn-primary" onClick={() => window.print()}>
            Print Ticket
          </button>
          <p className="text-sm text-gray-500">
            You can also show the QR code on your phone at the cinema entrance
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;