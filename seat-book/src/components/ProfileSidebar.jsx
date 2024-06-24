import React from 'react';
import { Link } from 'react-router-dom';

const ProfileSidebar = ({ isOpen, onClose, onLogout, onLogin, user }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
      <div className="bg-white shadow-lg p-6 w-64 h-full flex flex-col">
        <button
          className="self-end text-2xl text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6">Profile</h2>

        {/* Sidebar Links */}
        <div className="flex-grow">
          {user ? (
            <>
              <Link to="/orders" className="block mb-4 text-gray-700 hover:text-gray-900" onClick={onClose}>
                My Orders
              </Link>
              <Link to="/support" className="block mb-4 text-gray-700 hover:text-gray-900" onClick={onClose}>
                Help & Support
              </Link>
            </>
          ) : (
            <p className="mb-4 text-gray-700">Welcome, Guest! Please log in to access more features.</p>
          )}
        </div>

        {/* Authentication Button */}
        {user ? (
          <button
            className="mt-auto text-white bg-gray-800 px-4 py-2 rounded hover:bg-red-600"
            onClick={onLogout}
          >
            Sign Out
          </button>
        ) : (
          <button
            className="mt-auto text-white bg-gray-800 px-4 py-2 rounded hover:bg-blue-600"
            onClick={onLogin}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileSidebar;
