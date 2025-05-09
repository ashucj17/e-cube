import { GET_EVENTS, EVENT_ERROR } from '../types';

const initialState = {
  events: [],
  loading: true,
  error: {}
};

export default function eventReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EVENTS:
      return {
        ...state,
        events: payload,
        loading: false
      };
    case EVENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}