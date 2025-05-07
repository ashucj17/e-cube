import axios from 'axios';

// Action Types
export const FETCH_LATEST_MOVIES_START = 'FETCH_LATEST_MOVIES_START';
export const FETCH_LATEST_MOVIES_SUCCESS = 'FETCH_LATEST_MOVIES_SUCCESS';
export const FETCH_LATEST_MOVIES_FAILURE = 'FETCH_LATEST_MOVIES_FAILURE';

export const FETCH_UPCOMING_MOVIES_START = 'FETCH_UPCOMING_MOVIES_START';
export const FETCH_UPCOMING_MOVIES_SUCCESS = 'FETCH_UPCOMING_MOVIES_SUCCESS';
export const FETCH_UPCOMING_MOVIES_FAILURE = 'FETCH_UPCOMING_MOVIES_FAILURE';

export const FETCH_MOVIE_DETAILS_START = 'FETCH_MOVIE_DETAILS_START';
export const FETCH_MOVIE_DETAILS_SUCCESS = 'FETCH_MOVIE_DETAILS_SUCCESS';
export const FETCH_MOVIE_DETAILS_FAILURE = 'FETCH_MOVIE_DETAILS_FAILURE';

export const SELECT_SEATS = 'SELECT_SEATS';
export const COMPLETE_BOOKING = 'COMPLETE_BOOKING';

// Action Creators
export const fetchLatestMovies = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_LATEST_MOVIES_START });
    
    try {
      const response = await axios.get('http://3.17.216.66:4000/latest');
      dispatch({ 
        type: FETCH_LATEST_MOVIES_SUCCESS, 
        payload: response.data 
      });
    } catch (error) {
      dispatch({ 
        type: FETCH_LATEST_MOVIES_FAILURE, 
        payload: error.message 
      });
    }
  };
};

export const fetchUpcomingMovies = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_UPCOMING_MOVIES_START });
    
    try {
      const response = await axios.get('http://3.17.216.66:4000/upcomingMovies');
      dispatch({ 
        type: FETCH_UPCOMING_MOVIES_SUCCESS, 
        payload: response.data 
      });
    } catch (error) {
      dispatch({ 
        type: FETCH_UPCOMING_MOVIES_FAILURE, 
        payload: error.message 
      });
    }
  };
};

export const fetchMovieDetails = (movieId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_MOVIE_DETAILS_START });
    
    try {
      const response = await axios.get(`http://3.17.216.66:4000/latest/${movieId}`);
      dispatch({ 
        type: FETCH_MOVIE_DETAILS_SUCCESS, 
        payload: response.data 
      });
    } catch (error) {
      dispatch({ 
        type: FETCH_MOVIE_DETAILS_FAILURE, 
        payload: error.message 
      });
    }
  };
};

export const selectSeats = (seats, totalPrice) => {
  return {
    type: SELECT_SEATS,
    payload: {
      seats,
      totalPrice
    }
  };
};

export const completeBooking = (ticketDetails) => {
  return {
    type: COMPLETE_BOOKING,
    payload: ticketDetails
  };
};