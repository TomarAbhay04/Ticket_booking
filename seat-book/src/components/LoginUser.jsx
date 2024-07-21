import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { useUserAuth } from '../context/UserAuthContext';

// Tailwind CSS utility classes
const buttonClass = 'w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700';

const Login = () => {
  const { googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-center text-3xl font-bold text-gray-700 dark:text-white mb-6">Login to Your Account</h2>
        <div className="flex justify-center">
          <GoogleButton
            className="w-full"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
        <div className="flex justify-center">
          <span className="text-gray-500 dark:text-gray-300">or</span>
        </div>
        <div className="flex justify-center">
          <Link to="/">
            <button type="button" className={buttonClass}>Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
