import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Correct import using named export
import movieReducer from '../reducers/movieReducer';
// Import other reducers as needed

// Combine all reducers
const rootReducer = combineReducers({
  movies: movieReducer,
  // Add other reducers here
});

// Create the store with middleware
const configureStore = () => {
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
};

export default configureStore;