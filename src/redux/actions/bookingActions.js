import {
    SELECT_SEATS,
    SET_TICKET_TYPE,
    COMPLETE_BOOKING,
    RESET_BOOKING
  } from '../types';
  
  export const selectSeats = (seats) => (dispatch) => {
    dispatch({
      type: SELECT_SEATS,
      payload: seats
    });
  };
  
  export const setTicketType = (ticketType) => (dispatch) => {
    dispatch({
      type: SET_TICKET_TYPE,
      payload: ticketType
    });
  };
  
  export const completeBooking = (bookingData) => (dispatch) => {
    dispatch({
      type: COMPLETE_BOOKING,
      payload: bookingData
    });
  };
  
  export const resetBooking = () => (dispatch) => {
    dispatch({
      type: RESET_BOOKING
    });
  };
  