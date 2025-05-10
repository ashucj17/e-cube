import {
  SET_TICKET_TYPE,
  SELECT_SEATS,
  COMPLETE_BOOKING,
  RESET_BOOKING
} from '../types';

export const setTicketType = (ticketType) => {
  return {
    type: SET_TICKET_TYPE,
    payload: ticketType
  };
};

export const selectSeats = (seats) => {
  return {
    type: SELECT_SEATS,
    payload: seats
  };
};

export const completeBooking = (bookingData) => {
  return {
    type: COMPLETE_BOOKING,
    payload: bookingData
  };
};

export const resetBooking = () => {
  return {
    type: RESET_BOOKING
  };
};

// Adding the missing bookTickets function
export const bookTickets = (bookingData) => {
  return (dispatch) => {
    // Here you would typically make an API call to save the booking
    // For now, we'll just dispatch completeBooking directly
    dispatch(completeBooking(bookingData));
  };
};