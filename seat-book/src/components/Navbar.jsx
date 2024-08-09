import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import ProfileSidebar from './ProfileSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'; // Import the profile icon
import '../styles/home.css'

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
    <nav className="bg-gray-100  p-4 relative z-10">
      <div className="container mx-auto flex justify-between items-center navbar ">
        {/* Logo */}
        <div className="text-black font-roboto font-bold text-lg logo">Your Logo</div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="lg:hidden text-black focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? 'Close' : 'Menu'}
        </button>

        {/* Navigation Links (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/movies" className="text-black font-bold font-roboto hover:text-gray-300">
            Movies
          </Link>
          <Link to="/aboutus" className="text-black font-bold font-roboto hover:text-gray-300">
            About Us
          </Link>
          <Link to="/applyforfranchise" className="text-black font-bold font-roboto hover:text-gray-300">
            Apply For Franchise
          </Link>
        </div>

        {/* Mobile Menu (Visible on Mobile) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-gray-700 p-4">
            <Link to="/movies" className="block text-white py-2 hover:text-gray-300">
              Movies
            </Link>
            <Link to="/aboutus" className="block text-white py-2 hover:text-gray-300">
              About Us
            </Link>
            <Link to="/advertise-with-us" className="block text-white py-2 hover:text-gray-300">
              Advertise With Us
            </Link>
          </div>
        )}

        {/* Profile Section */}
        <div className="flex items-center space-x-4 ">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="text-black text-2xl cursor-pointer"
            onClick={handleProfileClick}
          />
          <span
            className="text-black font-roboto font-bold cursor-pointer hover:text-gray-300"
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
