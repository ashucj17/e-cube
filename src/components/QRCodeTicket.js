import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeTicket = ({ bookingDetails }) => {
  return (
    <div className="qr-code-container">
      <h5 className="mb-3">Scan this QR code at the cinema</h5>
      <div className="d-flex justify-content-center mb-3">
        <QRCodeSVG
          value={bookingDetails}
          size={200}
        />
      </div>
    </div>
  );
};

export default QRCodeTicket;