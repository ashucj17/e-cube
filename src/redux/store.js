import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './rootReducer';

// Enable Redux DevTools Extension for debugging
const composeEnhancers = 
  (typeof window !== 'undefined' && 
   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Create the Redux store with thunk middleware and DevTools
const store = createStore(
  rootReducer, 
  composeEnhancers(applyMiddleware(thunk))
);

export default store;