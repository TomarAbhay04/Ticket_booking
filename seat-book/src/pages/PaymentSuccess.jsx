import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa'; // For a check icon

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reference = searchParams.get('reference');

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8">
        <div className="text-center mb-6">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h1 className="text-3xl font-semibold text-gray-800">Payment Successful!</h1>
        </div>
        <p className="text-center text-gray-600 mb-4">
          Your payment was processed successfully. Your reference ID is:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center">
          <span className="text-gray-700 font-medium">{reference}</span>
        </div>
        <div className="text-center space-y-4 space-x-4">
          <button 
            onClick={() => navigate('/')} 
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Go to Home
          </button>
          <button 
            onClick={() => navigate('/orders')} 
            className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition duration-300"
          >
            Check Your Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
