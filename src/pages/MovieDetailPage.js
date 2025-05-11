import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
// Import your API service or actions
import { movieService } from '../services/movieService'; // Adjust path as needed

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await movieService.getMovieById(id);
        setMovie(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movie details');
        setLoading(false);
        console.error(err);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <Container>
      <Row className="my-4">
        <Col md={4}>
          <img 
            src={movie.posterUrl || 'https://via.placeholder.com/300x450'} 
            alt={movie.title} 
            className="img-fluid rounded"
          />
        </Col>
        <Col md={8}>
          <h1>{movie.title}</h1>
          <p className="lead">{movie.tagline}</p>
          <p><strong>Release Date:</strong> {movie.releaseDate}</p>
          <p><strong>Genre:</strong> {movie.genres?.join(', ')}</p>
          <p><strong>Duration:</strong> {movie.runtime} minutes</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          {/* Add more details as needed */}
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetailPage;