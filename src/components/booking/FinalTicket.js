import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { generateQRCode } from '../../utils/qrCodeGenerator';
import './FinalTicket.css';

const FinalTicket = () => {
  const navigate = useNavigate();
  const { bookingComplete, ticketDetails } = useSelector(state => state.movies.booking);
  const [qrCode, setQrCode] = useState('');
  
  useEffect(() => {
    if (!bookingComplete || !ticketDetails) {
      navigate('/');
      return;
    }
    
    // Generate QR code
    const generateQR = async () => {
      try {
        const qrDataUrl = await generateQRCode(JSON.stringify({
          movieName: ticketDetails.movieName,
          date: ticketDetails.date,
          time: ticketDetails.time,
          seats: ticketDetails.seats,
          price: ticketDetails.totalPrice
        }));
        setQrCode(qrDataUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };
    
    generateQR();
  }, [bookingComplete, ticketDetails, navigate]);
  
  if (!bookingComplete || !ticketDetails) {
    return null;
  }
  
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="final-ticket-container">
      <h2 className="section-title">Booking Confirmed!</h2>
      
      <div className="ticket">
        <div className="ticket-header">
          <h3>E-Cube Cinemas</h3>
          <p className="ticket-id">Booking ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
        </div>
        
        <div className="ticket-content">
          <div className="ticket-details">
            <div className="movie-info">
              <h4>{ticketDetails.movieName}</h4>
              <div className="movie-meta">
                <p><strong>Date:</strong> {formatDate(ticketDetails.date)}</p>
                <p><strong>Time:</strong> {ticketDetails.time}</p>
                <p><strong>Seats:</strong> {ticketDetails.seats.join(', ')}</p>
                <p><strong>Ticket Type:</strong> {ticketDetails.ticketType.charAt(0).toUpperCase() + ticketDetails.ticketType.slice(1)}</p>
                <p><strong>Quantity:</strong> {ticketDetails.quantity}</p>
                <p><strong>Total Price:</strong> ${ticketDetails.totalPrice}</p>
              </div>
            </div>
            
            {ticketDetails.posterImage && (
              <div className="ticket-poster">
                <img src={ticketDetails.posterImage} alt={ticketDetails.movieName} />
              </div>
            )}
          </div>
          
          <div className="ticket-qr">
            <p>Scan this QR code at the theater</p>
            {qrCode ? (
              <img src={qrCode} alt="Ticket QR Code" />
            ) : (
              <div className="qr-loading">Loading QR code...</div>
            )}
          </div>
        </div>
        
        <div className="ticket-footer">
          <p>Thank you for booking with E-Cube Cinemas!</p>
          <p className="ticket-note">Please arrive 15 minutes before showtime. This ticket is non-refundable.</p>
        </div>
      </div>
      
      <div className="ticket-actions">
        <button className="btn" onClick={() => window.print()}>
          Print Ticket
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default FinalTicket;