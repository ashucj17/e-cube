import {
  FETCH_EVENTS_START,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE
} from '../actions/eventActions';

const initialState = {
  events: {
    data: [],
    loading: false,
    error: null
  }
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_EVENTS_START:
      return {
        ...state,
        events: {
          ...state.events,
          loading: true,
          error: null
        }
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        events: {
          data: action.payload,
          loading: false,
          error: null
        }
      };
    case FETCH_EVENTS_FAILURE:
      return {
        ...state,
        events: {
          ...state.events,
          loading: false,
          error: action.payload
        }
      };
    default:
      return state;
  }
}