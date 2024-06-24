import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { useUserAuth } from '../context/UserAuthContext';
import PhoneSignUp from './PhoneSignup.jsx';

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
    <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 py-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6">
        <h2 className="text-center text-2xl font-semibold text-gray-700 dark:text-white mb-4">Please Login</h2>
        <div className="flex justify-center">
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
        {/* <div className="flex justify-center">
          <span className="text-gray-500 dark:text-gray-300">or</span>
        </div> */}
        <PhoneSignUp />
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
