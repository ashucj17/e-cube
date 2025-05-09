import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import PropTypes from 'prop-types';

const QRCodeTicket = ({ ticketData }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (canvasRef.current) {
      // Convert ticket data to string and generate QR code
      const ticketString = JSON.stringify(ticketData);
      
      QRCode.toCanvas(canvasRef.current, ticketString, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      }, (error) => {
        if (error) console.error('Error generating QR code:', error);
      });
    }
  }, [ticketData]);

  return (
    <div className="qr-code-container flex flex-col items-center p-4">
      <h3 className="text-lg font-semibold mb-3">Scan for Entry</h3>
      <canvas ref={canvasRef} className="border border-gray-200 rounded-md" />
      <p className="text-sm text-gray-500 mt-2">
        Present this QR code at the cinema entrance
      </p>
    </div>
  );
};

QRCodeTicket.propTypes = {
  ticketData: PropTypes.object.isRequired,
};

export default QRCodeTicket;