// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

// Import Bootstrap CSS (replaces Tailwind import)
import 'bootstrap/dist/css/bootstrap.min.css';
// Optional: Import Bootstrap JS if you need interactive components
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import any custom styles after Bootstrap
import './assets/styles/bootstrap-custom.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);