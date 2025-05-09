import {
    GET_LATEST_MOVIES,
    GET_MOVIE_DETAILS,
    GET_UPCOMING_MOVIES,
    MOVIE_ERROR
  } from '../types';
  
  const initialState = {
    latestMovies: [],
    currentMovie: null,
    upcomingMovies: [],
    loading: true,
    error: {}
  };
  
  export default function movieReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_LATEST_MOVIES:
        return {
          ...state,
          latestMovies: payload,
          loading: false
        };
      case GET_MOVIE_DETAILS:
        return {
          ...state,
          currentMovie: payload,
          loading: false
        };
      case GET_UPCOMING_MOVIES:
        return {
          ...state,
          upcomingMovies: payload,
          loading: false
        };
      case MOVIE_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        };
      default:
        return state;
    }
  }
  