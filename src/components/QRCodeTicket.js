// src/components/QRCodeTicket.js
import React from 'react';
// Note: You would need to install a QR code library like 'qrcode.react'
// npm install qrcode.react
import { QRCodeSVG } from 'qrcode.react';

const QRCodeTicket = ({ booking }) => {
  const { 
    bookingId, 
    movie, 
    date, 
    time, 
    seats, 
    theater, 
    ticketType,
    qrData // This would typically be a unique code or the booking ID
  } = booking;

  // Format date
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="card border-0 shadow">
      <div className="card-body p-4">
        <div className="row">
          <div className="col-md-8 border-end">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold mb-0">CinemaPlus</h3>
              <span className="badge bg-success">Confirmed</span>
            </div>
            
            <h5 className="fw-bold mb-4">{movie.title}</h5>
            
            <div className="row mb-4">
              <div className="col-6">
                <div className="mb-3">
                  <div className="text-secondary mb-1">Date</div>
                  <div className="fw-bold">{formatDate(date)}</div>
                </div>
                <div className="mb-3">
                  <div className="text-secondary mb-1">Time</div>
                  <div className="fw-bold">{time}</div>
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <div className="text-secondary mb-1">Theater</div>
                  <div className="fw-bold">{theater}</div>
                </div>
                <div className="mb-3">
                  <div className="text-secondary mb-1">Seats</div>
                  <div className="fw-bold">{seats.join(', ')}</div>
                </div>
              </div>
            </div>
            
            {ticketType && (
              <div className="alert alert-light mb-4">
                <div className="text-secondary mb-1">Ticket Type</div>
                <div className="fw-bold">{ticketType}</div>
              </div>
            )}
            
            <div className="d-flex justify-content-between align-items-center text-secondary small">
              <div>Booking ID: {bookingId}</div>
              <div>Please present this ticket at the entrance</div>
            </div>
          </div>
          
          <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
            <div className="bg-white p-2 border mb-3">
              <QRCodeSVG 
                value={qrData || bookingId} 
                size={150}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"}
                includeMargin={false}
              />
            </div>
            <div className="text-center">
              <div className="fw-bold">Scan QR Code</div>
              <div className="text-secondary small">For quick entry</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card-footer bg-white p-3 d-flex justify-content-center gap-2">
        <button className="btn btn-outline-primary">
          <i className="bi bi-download me-2"></i>
          Download
        </button>
        <button className="btn btn-outline-secondary">
          <i className="bi bi-printer me-2"></i>
          Print
        </button>
        <button className="btn btn-outline-secondary">
          <i className="bi bi-envelope me-2"></i>
          Email
        </button>
      </div>
    </div>
  );
};

export default QRCodeTicket;