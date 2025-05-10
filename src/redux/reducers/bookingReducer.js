import {
  SET_TICKET_TYPE,
  SELECT_SEATS,
  COMPLETE_BOOKING,
  RESET_BOOKING
} from '../types';

const initialState = {
  ticketType: 'regular',
  selectedSeats: [],
  booking: null,
  loading: false,
  error: null
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TICKET_TYPE:
      return {
        ...state,
        ticketType: action.payload
      };
    
    case SELECT_SEATS:
      return {
        ...state,
        selectedSeats: action.payload
      };
    
    case COMPLETE_BOOKING:
      return {
        ...state,
        booking: action.payload,
        loading: false
      };
    
    case RESET_BOOKING:
      return {
        ...initialState
      };
    
    default:
      return state;
  }
};

export default bookingReducer;