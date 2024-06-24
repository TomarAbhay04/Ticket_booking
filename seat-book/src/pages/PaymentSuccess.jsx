import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reference = searchParams.get('reference');

  return (
    <div className="flex justify-center items-center h-full">
      <div className="success-container flex justify-center flex-col">
        <h1 className='mb-4'>Payment Successful!</h1>
        <p>Your reference ID is: {reference}</p>
        <button onClick={() => window.location.href = '/'}>Go to Home</button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
