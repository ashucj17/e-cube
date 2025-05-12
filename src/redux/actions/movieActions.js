import axios from 'axios';
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

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://3.17.216.66:4000';

// Action for fetching general movies
export const fetchMovies = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_MOVIES_REQUEST });
    
    try {
      // Fallback to local data if API key is not set
      if (!API_KEY) {
        const localMoviesData = JSON.parse(localStorage.getItem('moviesData')) || [];
        dispatch({
          type: FETCH_MOVIES_SUCCESS,
          payload: localMoviesData,
        });
        return;
      }

      const response = await axios.get(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      
      dispatch({
        type: FETCH_MOVIES_SUCCESS,
        payload: response.data.results,
      });
    } catch (error) {
      // Fallback to local data on error
      const localMoviesData = JSON.parse(localStorage.getItem('moviesData')) || [];
      
      dispatch({
        type: FETCH_MOVIES_FAILURE,
        payload: error.message,
      });

      // If local data exists, dispatch it
      if (localMoviesData.length) {
        dispatch({
          type: FETCH_MOVIES_SUCCESS,
          payload: localMoviesData,
        });
      }
    }
  };
};

// Action for fetching latest movies
export const fetchLatestMovies = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_LATEST_MOVIES_REQUEST });
    
    try {
      // Fallback to local data if API key is not set
      if (!API_KEY) {
        const localLatestMoviesData = JSON.parse(localStorage.getItem('latestMoviesData')) || [];
        dispatch({
          type: FETCH_LATEST_MOVIES_SUCCESS,
          payload: localLatestMoviesData,
        });
        return;
      }

      const response = await axios.get(
        `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
      );
      
      dispatch({
        type: FETCH_LATEST_MOVIES_SUCCESS,
        payload: response.data.results,
      });
    } catch (error) {
      // Fallback to local data on error
      const localLatestMoviesData = JSON.parse(localStorage.getItem('latestMoviesData')) || [];
      
      dispatch({
        type: FETCH_LATEST_MOVIES_FAILURE,
        payload: error.message,
      });

      // If local data exists, dispatch it
      if (localLatestMoviesData.length) {
        dispatch({
          type: FETCH_LATEST_MOVIES_SUCCESS,
          payload: localLatestMoviesData,
        });
      }
    }
  };
};

// Action for fetching upcoming movies
export const fetchUpcomingMovies = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_UPCOMING_MOVIES_REQUEST });
    
    try {
      // Fallback to local data if API key is not set
      if (!API_KEY) {
        const localUpcomingMoviesData = JSON.parse(localStorage.getItem('upcomingMoviesData')) || [];
        dispatch({
          type: FETCH_UPCOMING_MOVIES_SUCCESS,
          payload: localUpcomingMoviesData,
        });
        return;
      }

      const response = await axios.get(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      );
      
      dispatch({
        type: FETCH_UPCOMING_MOVIES_SUCCESS,
        payload: response.data.results,
      });
    } catch (error) {
      // Fallback to local data on error
      const localUpcomingMoviesData = JSON.parse(localStorage.getItem('upcomingMoviesData')) || [];
      
      dispatch({
        type: FETCH_UPCOMING_MOVIES_FAILURE,
        payload: error.message,
      });

      // If local data exists, dispatch it
      if (localUpcomingMoviesData.length) {
        dispatch({
          type: FETCH_UPCOMING_MOVIES_SUCCESS,
          payload: localUpcomingMoviesData,
        });
      }
    }
  };
};

// Action for selecting a movie
export const selectMovie = (movie) => {
  return {
    type: SELECT_MOVIE,
    payload: movie,
  };
};

// Action for getting movie details
export const getMovieDetails = (movieId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_MOVIES_REQUEST });
    
    try {
      // Fallback to local data if API key is not set
      if (!API_KEY) {
        const localMoviesData = JSON.parse(localStorage.getItem('moviesData')) || [];
        const selectedMovie = localMoviesData.find(movie => movie.id === parseInt(movieId));
        
        dispatch({
          type: GET_MOVIE_DETAILS,
          payload: selectedMovie,
        });
        return;
      }

      const response = await axios.get(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits,videos`
      );
      
      dispatch({
        type: GET_MOVIE_DETAILS,
        payload: response.data,
      });
    } catch (error) {
      // Fallback to local data on error
      const localMoviesData = JSON.parse(localStorage.getItem('moviesData')) || [];
      const selectedMovie = localMoviesData.find(movie => movie.id === parseInt(movieId));
      
      dispatch({
        type: FETCH_MOVIES_FAILURE,
        payload: error.message,
      });

      // If local movie data exists, dispatch it
      if (selectedMovie) {
        dispatch({
          type: GET_MOVIE_DETAILS,
          payload: selectedMovie,
        });
      }
    }
  };
};