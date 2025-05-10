import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  GET_MOVIE_DETAILS,
  FETCH_UPCOMING_MOVIES_SUCCESS
} from '../types';

// Sample movie data for demonstration
const demoMovies = [
  {
    id: '1',
    title: 'Inception',
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
    genre: ['Sci-Fi', 'Action'],
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    runtime: 148,
    rating: 'PG-13',
    releaseDate: '2010-07-16',
    posterUrl: '/api/placeholder/300/450'
  },
  {
    id: '2',
    title: 'The Shawshank Redemption',
    director: 'Frank Darabont',
    cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
    genre: ['Drama'],
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    runtime: 142,
    rating: 'R',
    releaseDate: '1994-10-14',
    posterUrl: '/api/placeholder/300/450'
  },
  {
    id: '3',
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    genre: ['Action', 'Crime', 'Drama'],
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    runtime: 152,
    rating: 'PG-13',
    releaseDate: '2008-07-18',
    posterUrl: '/api/placeholder/300/450'
  }
];

const upcomingMoviesDemoData = [
  {
    id: '4',
    title: 'Dune: Part Two',
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson'],
    genre: ['Sci-Fi', 'Adventure'],
    description: 'The saga continues as Paul Atreides unites with the Fremen people of Arrakis to wage war against House Harkonnen.',
    runtime: 165,
    rating: 'PG-13',
    releaseDate: '2025-08-15',
    posterUrl: '/api/placeholder/300/450'
  },
  {
    id: '5',
    title: 'Avatar 3',
    director: 'James Cameron',
    cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'],
    genre: ['Action', 'Adventure', 'Fantasy'],
    description: 'Jake Sully and Neytiri continue their journey across the world of Pandora in this next installment.',
    runtime: 180,
    rating: 'PG-13',
    releaseDate: '2025-12-20',
    posterUrl: '/api/placeholder/300/450'
  }
];

// Action Creators
export const fetchMoviesRequest = () => {
  return {
    type: FETCH_MOVIES_REQUEST
  };
};

export const fetchMoviesSuccess = (movies) => {
  return {
    type: FETCH_MOVIES_SUCCESS,
    payload: movies
  };
};

export const fetchMoviesFailure = (error) => {
  return {
    type: FETCH_MOVIES_FAILURE,
    payload: error
  };
};

export const getMovieDetailsSuccess = (movie) => {
  return {
    type: GET_MOVIE_DETAILS,
    payload: movie
  };
};

export const fetchUpcomingMoviesSuccess = (movies) => {
  return {
    type: FETCH_UPCOMING_MOVIES_SUCCESS,
    payload: movies
  };
};

// Thunk action creators
export const fetchMovies = () => {
  return (dispatch) => {
    dispatch(fetchMoviesRequest());
    
    // In a real app, this would be an API call
    // For demo, we're using our example data
    try {
      // Simulate API delay
      setTimeout(() => {
        dispatch(fetchMoviesSuccess(demoMovies));
      }, 500);
    } catch (error) {
      dispatch(fetchMoviesFailure(error.message));
    }
  };
};

export const getMovieDetails = (movieId) => {
  return (dispatch) => {
    dispatch(fetchMoviesRequest());
    
    // In a real app, this would be an API call for a specific movie
    try {
      // Find the movie in our demo data
      const movie = [...demoMovies, ...upcomingMoviesDemoData].find(
        movie => movie.id === movieId
      );
      
      // Simulate API delay
      setTimeout(() => {
        if (movie) {
          dispatch(getMovieDetailsSuccess(movie));
        } else {
          dispatch(fetchMoviesFailure('Movie not found'));
        }
      }, 300);
    } catch (error) {
      dispatch(fetchMoviesFailure(error.message));
    }
  };
};

export const fetchUpcomingMovies = () => {
  return (dispatch) => {
    dispatch(fetchMoviesRequest());
    
    // In a real app, this would be an API call
    try {
      // Simulate API delay
      setTimeout(() => {
        dispatch(fetchUpcomingMoviesSuccess(upcomingMoviesDemoData));
      }, 500);
    } catch (error) {
      dispatch(fetchMoviesFailure(error.message));
    }
  };
};