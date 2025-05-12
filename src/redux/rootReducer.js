import { combineReducers } from 'redux';
import movieReducer from './reducers/movieReducer';
import eventReducer from './reducers/eventReducer';
import bookingReducer from './reducers/bookingReducer';

const rootReducer = combineReducers({
  movies: movieReducer,
  events: eventReducer,
  booking: bookingReducer
});

export default rootReducer;