import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Alert, ListGroup } from 'react-bootstrap';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [editing, setEditing] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { userInfo, loading, error } = useSelector(state => state.auth);
  const { bookings, loading: bookingsLoading } = useSelector(state => state.bookings || { bookings: [], loading: false });

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      setName(userInfo.name || '');
      setEmail(userInfo.email || '');
      
      // You'll need to create this action
      // dispatch(getMyBookings());
    }
  }, [navigate, userInfo, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    
    // You'll need to create this action
    // dispatch(updateUserProfile({ name, email, password }));
    setEditing(false);
  };

  return (
    <Container className="py-5">
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header as="h5">Profile</Card.Header>
            <Card.Body>
              {message && <Alert variant="danger">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              
              {editing ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      disabled={loading}
                    >
                      {loading ? 'Updating...' : 'Update'}
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={() => setEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              ) : (
                <>
                  <p><strong>Name:</strong> {userInfo?.name}</p>
                  <p><strong>Email:</strong> {userInfo?.email}</p>
                  <Button 
                    variant="primary" 
                    onClick={() => setEditing(true)}
                  >
                    Edit Profile
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8}>
          <Card>
            <Card.Header as="h5">My Bookings</Card.Header>
            <Card.Body>
              {bookingsLoading ? (
                <p>Loading bookings...</p>
              ) : bookings?.length === 0 ? (
                <p>You have no booking history.</p>
              ) : (
                <ListGroup variant="flush">
                  {bookings?.map((booking) => (
                    <ListGroup.Item key={booking._id}>
                      <Row>
                        <Col md={2}>
                          <img 
                            src={booking.movie?.poster || '/placeholder.png'} 
                            alt={booking.movie?.title}
                            className="img-fluid rounded"
                          />
                        </Col>
                        <Col md={7}>
                          <h5>{booking.movie?.title}</h5>
                          <p>Date: {new Date(booking.showtime?.date).toLocaleDateString()}</p>
                          <p>Time: {booking.showtime?.time}</p>
                          <p>Seats: {booking.seats.join(', ')}</p>
                        </Col>
                        <Col md={3} className="d-flex align-items-center justify-content-end">
                          <Button 
                            variant="outline-primary"
                            size="sm"
                            onClick={() => navigate(`/ticket/${booking._id}`)}
                          >
                            View Ticket
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;