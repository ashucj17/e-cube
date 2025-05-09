import { GET_EVENTS, EVENT_ERROR } from '../types';
import { api } from '../../api';

export const getEvents = () => async (dispatch) => {
  try {
    const res = await api.getEvents();
    
    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response?.data?.msg || 'Error loading events' }
    });
  }
};