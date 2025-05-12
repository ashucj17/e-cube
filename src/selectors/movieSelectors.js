// selectors.js
import { createSelector } from 'reselect';

const selectSelectedMovie = (state) => state.movies.selectedMovie;
const selectSelectedEvent = (state) => state.events.selectedEvent;

export const selectNavbarData = createSelector(
  [selectSelectedMovie, selectSelectedEvent],
  (movie, event) => ({
    movie,
    event
  })
);
