import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const movieService = {
  getAllMovies: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },
  
  getMovieById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie with id ${id}:`, error);
      throw error;
    }
  },
  
  searchMovies: async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies/search`, {
        params: { query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  }
};

export default movieService;