// Navbar.js

import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Login from './LoginUser.jsx'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white font-bold text-lg">
          YourLogo
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? 'Close' : 'Menu'}
        </button>

        {/* Navigation Links (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/movies" className="text-white">Movies</Link>
          <Link to="/about-us" className="text-white">About Us</Link>
          <Link to="/advertise-with-us" className="text-white">Advertise With Us</Link>
        </div>

        {/* Mobile Menu (Visible on Mobile) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-gray-700 p-4">
             <Link to="/movies" className="text-white">Movies</Link>
          <Link to="/about-us" className="text-white">About Us</Link>
          <Link to="/advertise-with-us" className="text-white">Advertise With Us</Link>
          </div>
        )}

        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          {showLogin ? (
            <LoginUser />
          ) : (
            <Link
              to="/login"
              className="text-white"
              onClick={() => {
                setShowLogin(true);
                // Redirect to the login page
                navigate('/login');
              }}
            >
              Login
            </Link>
          )}

          {/* ... (your existing code) */}
        </div>
        
        {/* <div className="flex items-center space-x-4">
          <Link to="/cart" className="text-white">Cart</Link>
          <Link to="/profile" className="text-white">Profile</Link>
          </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
