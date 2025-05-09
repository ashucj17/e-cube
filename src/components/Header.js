import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-800 text-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">E-Cube</Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-blue-300">Latest Movies</Link></li>
            <li><Link to="/upcoming" className="hover:text-blue-300">Upcoming Movies</Link></li>
            <li><Link to="/events" className="hover:text-blue-300">Events</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;