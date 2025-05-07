import axios from 'axios';

// Action Types
export const FETCH_EVENTS_START = 'FETCH_EVENTS_START';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';

// Action Creators
export const fetchEvents = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_EVENTS_START });
    
    try {
      const response = await axios.get('http://3.17.216.66:4000/events');
      dispatch({ 
        type: FETCH_EVENTS_SUCCESS, 
        payload: response.data 
      });
    } catch (error) {
      dispatch({ 
        type: FETCH_EVENTS_FAILURE, 
        payload: error.message 
      });
    }
  };
};