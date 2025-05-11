import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  AUTH_CHECK_START,
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAILURE
} from '../constants/authConstants';

// Login user
export const loginUser = (credentials, navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post('/api/auth/login', credentials);
    
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    dispatch({ 
      type: LOGIN_SUCCESS, 
      payload: data.user 
    });
    
    navigate('/');
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message
    });
  }
};

// Register user
export const registerUser = (userData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const { data } = await axios.post('/api/auth/register', userData);
    
    dispatch({ 
      type: REGISTER_SUCCESS, 
      payload: data.message || 'Registration successful!' 
    });
    
    navigate('/login');
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message
    });
  }
};

// Logout user
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch({ type: LOGOUT });
};

// Check auth status
export const checkAuthStatus = () => async (dispatch) => {
  try {
    dispatch({ type: AUTH_CHECK_START });
    
    const token = localStorage.getItem('token');
    
    if (!token) {
      return dispatch({ type: AUTH_CHECK_FAILURE });
    }
    
    // Set token in headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    // Verify token with backend
    const { data } = await axios.get('/api/auth/verify');
    
    dispatch({
      type: AUTH_CHECK_SUCCESS,
      payload: data.user
    });
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: AUTH_CHECK_FAILURE });
  }
};

// Create a named object before exporting
const authActions = {
  loginUser,
  registerUser,
  logoutUser,
  checkAuthStatus
};

export default authActions;