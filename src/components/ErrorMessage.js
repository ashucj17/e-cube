import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <h3>Error</h3>
      <p>{message || 'An unknown error occurred.'}</p>
    </div>
  );
};

export default ErrorMessage;