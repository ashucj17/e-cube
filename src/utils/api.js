import axios from 'axios';

const BASE_URL = 'http://3.17.216.66:4000';

const api = {
  getLatestMovies: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/latest`);
      return response.data;
    } catch (error) {
      console.error('Error fetching latest movies:', error);
      throw error;
    }
  },
  
  getUpcomingMovies: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/upcomingMovies`);
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
      throw error;
    }
  },
  
  getMovieDetails: async (movieId) => {
    try {
      const response = await axios.get(`${BASE_URL}/latest/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },
  
  getEvents: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/events`);
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }
};

export default api;