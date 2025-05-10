import { combineReducers } from 'redux';
import movieReducer from './movieReducer';
import bookingReducer from './bookingReducer';
import eventReducer from './eventReducer';

const rootReducer = combineReducers({
  movies: movieReducer,
  bookings: bookingReducer,
  events: eventReducer
});

export default rootReducer;