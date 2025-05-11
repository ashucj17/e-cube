import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ConfirmationPage = () => {
  const { bookingId } = useParams();
  const dispatch = useDispatch();
  
  // You'll need to set up this reducer
  const { booking, loading, error } = useSelector(state => state.booking || {});

  useEffect(() => {
    if (bookingId) {
      // You'll need to create this action
      // dispatch(getBookingDetails(bookingId));
      console.log('Fetching booking details for:', bookingId);
    }
  }, [bookingId, dispatch]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <h2>Loading booking details...</h2>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <h2>Error</h2>
        <p className="text-danger">{error}</p>
        <Button as={Link} to="/" variant="primary">
          Return to Homepage
        </Button>
      </Container>
    );
  }

  // Create a placeholder booking for now
  const placeholderBooking = {
    _id: bookingId,
    movie: {
      title: 'Sample Movie',
      poster: '/placeholder.png'
    },
    showtime: {
      date: new Date().toISOString(),
      time: '7:00 PM'
    },
    seats: ['A1', 'A2'],
    totalPrice: 25.98,
    paymentMethod: 'Credit Card'
  };

  const currentBooking = booking || placeholderBooking;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                  <i className="bi bi-check-lg" style={{ fontSize: '40px' }}></i>
                </div>
                <h2 className="mb-0">Booking Confirmed!</h2>
                <p className="text-muted">Your booking has been successfully processed.</p>
              </div>
              
              <Row className="mb-4">
                <Col sm={4} className="text-center">
                  <img 
                    src={currentBooking.movie.poster} 
                    alt={currentBooking.movie.title}
                    className="img-fluid rounded mb-2"
                    style={{ maxHeight: '200px' }}
                  />
                </Col>
                <Col sm={8}>
                  <h4>{currentBooking.movie.title}</h4>
                  <p className="mb-1">
                    <strong>Date:</strong> {new Date(currentBooking.showtime.date).toLocaleDateString()}
                  </p>
                  <p className="mb-1">
                    <strong>Time:</strong> {currentBooking.showtime.time}
                  </p>
                  <p className="mb-1">
                    <strong>Seats:</strong> {currentBooking.seats.join(', ')}
                  </p>
                  <p className="mb-1">
                    <strong>Total Price:</strong> ${currentBooking.totalPrice.toFixed(2)}
                  </p>
                  <p className="mb-1">
                    <strong>Payment Method:</strong> {currentBooking.paymentMethod}
                  </p>
                </Col>
              </Row>
              
              <div className="text-center mt-4">
                <Button as={Link} to={`/ticket/${bookingId}`} variant="primary" className="me-2">
                  View Ticket
                </Button>
                <Button as={Link} to="/" variant="outline-secondary">
                  Return to Homepage
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfirmationPage;