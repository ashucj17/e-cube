import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_LATEST_MOVIES_REQUEST,
  FETCH_LATEST_MOVIES_SUCCESS,
  FETCH_LATEST_MOVIES_FAILURE,
  FETCH_UPCOMING_MOVIES_REQUEST,
  FETCH_UPCOMING_MOVIES_SUCCESS,
  FETCH_UPCOMING_MOVIES_FAILURE,
  SELECT_MOVIE,
  GET_MOVIE_DETAILS
} from '../types';

const initialState = {
  movies: [],
  latestMovies: [],
  upcomingMovies: [],
  selectedMovie: null,
  loading: false,
  error: null,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
    case FETCH_LATEST_MOVIES_REQUEST:
    case FETCH_UPCOMING_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };

    case FETCH_LATEST_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        latestMovies: action.payload,
      };

    case FETCH_UPCOMING_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        upcomingMovies: action.payload,
      };

    case FETCH_MOVIES_FAILURE:
    case FETCH_LATEST_MOVIES_FAILURE:
    case FETCH_UPCOMING_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SELECT_MOVIE:
      return {
        ...state,
        selectedMovie: action.payload,
      };
      
    case GET_MOVIE_DETAILS:
      return {
        ...state,
        loading: false,
        selectedMovie: action.payload,
      };

    default:
      return state;
  }
};

export default movieReducer;