import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the '/client' import for React 18
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './App';
import './index.css';

// Create the Redux store
const store = configureStore();

// React 18 way of rendering
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);