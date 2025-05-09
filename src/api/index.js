import axios from 'axios';

const API_BASE_URL = 'http://3.17.216.66:4000';

export const api = {
  getLatestMovies: () => axios.get(`${API_BASE_URL}/latest`),
  getMovieDetails: (id) => axios.get(`${API_BASE_URL}/latest/${id}`),
  getUpcomingMovies: () => axios.get(`${API_BASE_URL}/upcomingMovies`),
  getEvents: () => axios.get(`${API_BASE_URL}/events`)
};