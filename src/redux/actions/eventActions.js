import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
  GET_EVENT_DETAILS
} from '../types';

// Sample event data for demonstration
const demoEvents = [
  {
      "id": 1,
      "title": "Thor",
      "image": "1.jpg",
      "genre": "Action, Adenture, comedy",
      "director": "Taika Waititi",
      "stars": "Chris Hemsworth, Tom Hiddleston, Cate Blanchett, Mark Ruffalo",
      "plot": "Thor is imprisoned on the planet Sakaar, and must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela.",
      "currency": "THB",
      "prices": {
        "normal": 200,
        "superior": 300,
        "sofa": 600
      }
    },
  {
      "id": 2,
      "title": "Wonder woman",
      "genre": "Action, Adenture, Fantasy",
      "director": "Patty Jenkins",
      "stars": "Gal Gadot, Chris Pine, Robin Wright, Lucy Davis",
      "plot": "When a pilot crashes and tells of conflict in the outside world, Diana, an Amazonian warrior in training, leaves home to fight a war, discovering her full powers and true destiny.",
      "image": "2.jpg",
      "currency": "THB",
      "prices": {
        "normal": 200,
        "superior": 300,
        "sofa": 600
      }
    },
  {
      "id": 3,
      "title": "Logan",
      "genre": "Action, Drama, Sci-Fi",
      "director": "James Mangold ",
      "stars": "Hugh Jackman, Patrick Stewart, Dafne Keen, Boyd Holbrook",
      "plot": "In the near future, a weary Logan cares for an ailing Professor X, somewhere on the Mexican border. However, Logan's attempts to hide from the world, and his legacy, are upended when a young mutant arrives, pursued by dark forces.",
      "image": "3.jpg",
      "currency": "THB",
      "prices": {
        "normal": 200,
        "superior": 300,
        "sofa": 600
      }
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