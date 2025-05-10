import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import BookingPage from './pages/BookingPage';
import TicketPage from './pages/TicketPage';
import UpcomingMoviesPage from './pages/UpcomingMoviesPage';
import EventsPage from './pages/EventsPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movie/:movieId" element={<MovieDetailPage />} />
              <Route path="/booking/:movieId" element={<BookingPage />} />
              <Route path="/ticket/:movieId" element={<TicketPage />} />
              <Route path="/upcoming" element={<UpcomingMoviesPage />} />
              <Route path="/events" element={<EventsPage />} />
              {/* Fallback route */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;