import {
    SELECT_SEATS,
    SET_TICKET_TYPE,
    COMPLETE_BOOKING,
    RESET_BOOKING
  } from '../types';
  
  const initialState = {
    selectedSeats: [],
    ticketType: 'normal',
    booking: null
  };
  
  export default function bookingReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case SELECT_SEATS:
        return {
          ...state,
          selectedSeats: payload
        };
      case SET_TICKET_TYPE:
        return {
          ...state,
          ticketType: payload
        };
      case COMPLETE_BOOKING:
        return {
          ...state,
          booking: payload
        };
      case RESET_BOOKING:
        return initialState;
      default:
        return state;
    }
  }