const mockMovies = [
  { id: 1, title: 'The Avengers', poster: 'avengers.jpg', rating: 8.5, releaseDate: '2023-05-12' },
  { id: 2, title: 'Interstellar', poster: 'interstellar.jpg', rating: 9.0, releaseDate: '2023-05-15' },
];

const mockUpcomingMovies = [
  { id: 3, title: 'Spider-Man 4', poster: 'spiderman.jpg', rating: null, releaseDate: '2025-07-20' },
  { id: 4, title: 'Black Panther 3', poster: 'panther.jpg', rating: null, releaseDate: '2025-08-10' },
];

const mockLatestMovies = [
  { id: 5, title: 'Fast and Furious 15', poster: 'fast15.jpg', rating: 7.5, releaseDate: '2025-01-12' },
  { id: 6, title: 'Jurassic World: New Era', poster: 'jurassic.jpg', rating: 8.2, releaseDate: '2025-02-20' },
];

// API methods
const movieApi = {
  // Get all movies
  getMovies: async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockMovies);
      }, 800);
    });
  },
  
  // Get upcoming movies
  getUpcomingMovies: async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUpcomingMovies);
      }, 800);
    });
  },
  
  // Get latest movies
  getLatestMovies: async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockLatestMovies);
      }, 800);
    });
  },
  
  // Get movie by ID
  getMovieById: async (id) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const allMovies = [...mockMovies, ...mockUpcomingMovies, ...mockLatestMovies];
        const movie = allMovies.find(m => m.id === parseInt(id));
        
        if (movie) {
          resolve(movie);
        } else {
          reject(new Error('Movie not found'));
        }
      }, 500);
    });
  }
};

export default movieApi;