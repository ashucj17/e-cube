import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  GET_MOVIE_DETAILS,
  FETCH_UPCOMING_MOVIES_SUCCESS
} from '../types';

const initialState = {
  movies: [],
  upcomingMovies: [],
  selectedMovie: null,
  loading: false,
  error: null
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    
    case FETCH_UPCOMING_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        upcomingMovies: action.payload
      };
    
    case FETCH_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case GET_MOVIE_DETAILS:
      return {
        ...state,
        selectedMovie: action.payload,
        loading: false
      };
    
    default:
      return state;
  }
};

export default movieReducer;