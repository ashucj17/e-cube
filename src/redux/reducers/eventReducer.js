import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
  GET_EVENT_DETAILS
} from '../types';

const initialState = {
  events: [],
  selectedEvent: null,
  loading: false,
  error: null
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload
      };
    
    case FETCH_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case GET_EVENT_DETAILS:
      return {
        ...state,
        selectedEvent: action.payload,
        loading: false
      };
    
    default:
      return state;
  }
};

export default eventReducer;