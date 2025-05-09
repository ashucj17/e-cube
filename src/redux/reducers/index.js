import { combineReducers } from 'redux';
import movieReducer from './movieReducer';
import eventReducer from './eventReducer';
import bookingReducer from './bookingReducer';

export default combineReducers({
  movies: movieReducer,
  events: eventReducer,
  booking: bookingReducer
});