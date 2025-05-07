import { 
    FETCH_LATEST_MOVIES_START,
    FETCH_LATEST_MOVIES_SUCCESS,
    FETCH_LATEST_MOVIES_FAILURE,
    FETCH_UPCOMING_MOVIES_START,
    FETCH_UPCOMING_MOVIES_SUCCESS,
    FETCH_UPCOMING_MOVIES_FAILURE,
    FETCH_MOVIE_DETAILS_START,
    FETCH_MOVIE_DETAILS_SUCCESS,
    FETCH_MOVIE_DETAILS_FAILURE,
    SELECT_SEATS,
    COMPLETE_BOOKING
  } from '../actions/movieActions';
  
  const initialState = {
    latestMovies: {
      data: [],
      loading: false,
      error: null
    },
    upcomingMovies: {
      data: [],
      loading: false,
      error: null
    },
    selectedMovie: {
      data: null,
      loading: false,
      error: null
    },
    booking: {
      seats: [],
      totalPrice: 0,
      bookingComplete: false,
      ticketDetails: null
    }
  };
  
  export default function movieReducer(state = initialState, action) {
    switch (action.type) {
      // Latest Movies
      case FETCH_LATEST_MOVIES_START:
        return {
          ...state,
          latestMovies: {
            ...state.latestMovies,
            loading: true,
            error: null
          }
        };
      case FETCH_LATEST_MOVIES_SUCCESS:
        return {
          ...state,
          latestMovies: {
            data: action.payload,
            loading: false,
            error: null
          }
        };
      case FETCH_LATEST_MOVIES_FAILURE:
        return {
          ...state,
          latestMovies: {
            ...state.latestMovies,
            loading: false,
            error: action.payload
          }
        };
      
      // Upcoming Movies
      case FETCH_UPCOMING_MOVIES_START:
        return {
          ...state,
          upcomingMovies: {
            ...state.upcomingMovies,
            loading: true,
            error: null
          }
        };
      case FETCH_UPCOMING_MOVIES_SUCCESS:
        return {
          ...state,
          upcomingMovies: {
            data: action.payload,
            loading: false,
            error: null
          }
        };
      case FETCH_UPCOMING_MOVIES_FAILURE:
        return {
          ...state,
          upcomingMovies: {
            ...state.upcomingMovies,
            loading: false,
            error: action.payload
          }
        };
      
      // Movie Details
      case FETCH_MOVIE_DETAILS_START:
        return {
          ...state,
          selectedMovie: {
            ...state.selectedMovie,
            loading: true,
            error: null
          }
        };
      case FETCH_MOVIE_DETAILS_SUCCESS:
        return {
          ...state,
          selectedMovie: {
            data: action.payload,
            loading: false,
            error: null
          }
        };
      case FETCH_MOVIE_DETAILS_FAILURE:
        return {
          ...state,
          selectedMovie: {
            ...state.selectedMovie,
            loading: false,
            error: action.payload
          }
        };
      
      // Booking
      case SELECT_SEATS:
        return {
          ...state,
          booking: {
            ...state.booking,
            seats: action.payload.seats,
            totalPrice: action.payload.totalPrice
          }
        };
      case COMPLETE_BOOKING:
        return {
          ...state,
          booking: {
            ...state.booking,
            bookingComplete: true,
            ticketDetails: action.payload
          }
        };
        
      default:
        return state;
    }
  }