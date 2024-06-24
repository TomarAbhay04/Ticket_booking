import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import ProfileSidebar from './ProfileSidebar';

const Navbar = () => {
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleProfileClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    await logOut();
    setIsSidebarOpen(false);
    // navigate('/login');
  };

  const handleLoginClick = () => {
    setIsSidebarOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 relative z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white font-bold text-lg">YourLogo</div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? 'Close' : 'Menu'}
        </button>

        {/* Navigation Links (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/movies" className="text-white hover:text-gray-300">
            Movies
          </Link>
          <Link to="/about-us" className="text-white hover:text-gray-300">
            About Us
          </Link>
          <Link to="/advertise-with-us" className="text-white hover:text-gray-300">
            Advertise With Us
          </Link>
        </div>

        {/* Mobile Menu (Visible on Mobile) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-gray-700 p-4">
            <Link to="/movies" className="block text-white py-2 hover:text-gray-300">
              Movies
            </Link>
            <Link to="/about-us" className="block text-white py-2 hover:text-gray-300">
              About Us
            </Link>
            <Link to="/advertise-with-us" className="block text-white py-2 hover:text-gray-300">
              Advertise With Us
            </Link>
          </div>
        )}

        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          <span
            className="text-white cursor-pointer hover:text-gray-300"
            onClick={handleProfileClick}
          >
            {user ? user.displayName || user.phoneNumber : "Guest"}
          </span>
          {/* Profile Sidebar */}
          <ProfileSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            onLogout={handleLogout}
            onLogin={handleLoginClick}
            user={user}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
