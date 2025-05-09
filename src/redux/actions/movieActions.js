import {
    GET_LATEST_MOVIES,
    GET_MOVIE_DETAILS,
    GET_UPCOMING_MOVIES,
    MOVIE_ERROR
  } from '../types';
  import { api } from '../../api';
  
  export const getLatestMovies = () => async (dispatch) => {
    try {
      const res = await api.getLatestMovies();
      
      dispatch({
        type: GET_LATEST_MOVIES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: MOVIE_ERROR,
        payload: { msg: err.response?.data?.msg || 'Error loading latest movies' }
      });
    }
  };
  
  export const getMovieDetails = (id) => async (dispatch) => {
    try {
      const res = await api.getMovieDetails(id);
      
      dispatch({
        type: GET_MOVIE_DETAILS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: MOVIE_ERROR,
        payload: { msg: err.response?.data?.msg || 'Error loading movie details' }
      });
    }
  };
  
  export const getUpcomingMovies = () => async (dispatch) => {
    try {
      const res = await api.getUpcomingMovies();
      
      dispatch({
        type: GET_UPCOMING_MOVIES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: MOVIE_ERROR,
        payload: { msg: err.response?.data?.msg || 'Error loading upcoming movies' }
      });
    }
  };
  