import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
  GET_EVENT_DETAILS
} from '../types';

// Sample event data for demonstration
const demoEvents = [
  {
    id: '1',
    title: 'Marvel Movie Marathon',
    date: '2025-05-20',
    startTime: '10:00',
    endTime: '23:00',
    description: 'Experience all the major Marvel movies back-to-back in our premium theater. Food and drinks included!',
    imageUrl: '/api/placeholder/600/400',
    price: 49.99,
    venue: 'Main Theater'
  },
  {
    id: '2',
    title: 'Director\'s Talk: Christopher Nolan',
    date: '2025-05-25',
    startTime: '19:00',
    endTime: '21:00',
    description: 'Join us for an exclusive discussion with acclaimed director Christopher Nolan about his filmmaking techniques and future projects.',
    imageUrl: '/api/placeholder/600/400',
    price: 29.99,
    venue: 'VIP Lounge'
  },
  {
    id: '3',
    title: 'Oscar Night Live Screening',
    date: '2026-02-28',
    startTime: '20:00',
    endTime: '00:00',
    description: 'Watch the Academy Awards live on our big screen! Red carpet dress code, champagne reception, and Oscar prediction contest included.',
    imageUrl: '/api/placeholder/600/400',
    price: 39.99,
    venue: 'Luxury Hall'
  }
];

// Action Creators
export const fetchEventsRequest = () => {
  return {
    type: FETCH_EVENTS_REQUEST
  };
};

export const fetchEventsSuccess = (events) => {
  return {
    type: FETCH_EVENTS_SUCCESS,
    payload: events
  };
};

export const fetchEventsFailure = (error) => {
  return {
    type: FETCH_EVENTS_FAILURE,
    payload: error
  };
};

export const getEventDetailsSuccess = (event) => {
  return {
    type: GET_EVENT_DETAILS,
    payload: event
  };
};

// Thunk action creators
export const fetchEvents = () => {
  return (dispatch) => {
    dispatch(fetchEventsRequest());
    
    // In a real app, this would be an API call
    try {
      // Simulate API delay
      setTimeout(() => {
        dispatch(fetchEventsSuccess(demoEvents));
      }, 500);
    } catch (error) {
      dispatch(fetchEventsFailure(error.message));
    }
  };
};

export const getEventDetails = (eventId) => {
  return (dispatch) => {
    dispatch(fetchEventsRequest());
    
    // In a real app, this would be an API call for a specific event
    try {
      // Find the event in our demo data
      const event = demoEvents.find(event => event.id === eventId);
      
      // Simulate API delay
      setTimeout(() => {
        if (event) {
          dispatch(getEventDetailsSuccess(event));
        } else {
          dispatch(fetchEventsFailure('Event not found'));
        }
      }, 300);
    } catch (error) {
      dispatch(fetchEventsFailure(error.message));
    }
  };
};