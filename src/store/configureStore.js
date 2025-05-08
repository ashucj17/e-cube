import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import movieReducer from '../reducers/movieReducer';
import eventReducer from '../reducers/eventReducer';

const rootReducer = combineReducers({
  movies: movieReducer,
  events: eventReducer,
});

const configureStore = () => {
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
};

export default configureStore;