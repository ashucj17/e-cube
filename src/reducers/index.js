import { combineReducers } from 'redux';
import movies from './movieReducer';
import events from './eventReducer';

const rootReducer = combineReducers({
  movies,
  events
});

export default rootReducer;