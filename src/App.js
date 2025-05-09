import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import BookingPage from './pages/BookingPage';
import TicketPage from './pages/TicketPage';
import UpcomingMoviesPage from './pages/UpcomingMoviesPage';
import EventsPage from './pages/EventsPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/ticket" element={<TicketPage />} />
          <Route path="/upcoming" element={<UpcomingMoviesPage />} />
          <Route path="/events" element={<EventsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;