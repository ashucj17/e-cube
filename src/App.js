import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LatestMovies from './components/movies/LatestMovies';
import UpcomingMovies from './components/movies/UpcomingMovies';
import MovieDetails from './components/movies/MovieDetails';
import TicketBooking from './components/booking/TicketBooking';
import FinalTicket from './components/booking/FinalTicket';
import Events from './components/events/Events';
import NotFound from './components/common/NotFound';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LatestMovies />} />
          <Route path="/latest" element={<LatestMovies />} />
          <Route path="/upcoming" element={<UpcomingMovies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/booking/:id" element={<TicketBooking />} />
          <Route path="/ticket" element={<FinalTicket />} />
          <Route path="/events" element={<Events />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;