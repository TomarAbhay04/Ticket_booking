import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserAuth } from '../context/UserAuthContext';
import { formatDisplayDate } from '../utils/dateUtils.js'; // Utility function to format dates

const Cart = () => {
  const { user } = useUserAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { movieTitle, selectedSeats, selectedMovie, selectedDate, selectedTimeSlot } = location.state || {};
  const totalPayment = selectedSeats?.length * 150;

  const handlePayment = async () => {
    if (!user) {
      console.error('User not logged in. Redirecting to login page.');
      navigate('/login');
      return;
    }
    try {
      if (typeof totalPayment !== 'number' || isNaN(totalPayment)) {
        console.error('Invalid totalPayment value:', totalPayment);
        return;
      }

      const payload = {
        userId: user.uid,
        selectedMovie,
        totalPayment,
        selectedTimeSlot,
        selectedDate,
        selectedSeats,
        movieTitle,
      };

      const { data: { key } } = await axios.get('https://ticket-booking-backend-rylx.onrender.com/api/getkey');

      const { data: { order } } = await axios.post('https://ticket-booking-backend-rylx.onrender.com/api/checkout', payload);

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Tomar Abhay",
        description: "Enabling Razorpay for React applications",
        image: "https://example.com/your_logo",
        order_id: order.id,
        prefill: {
          name: user.displayName || "Tomar Abhay",
          email: user.email || "tomarabhay@gmail.com",
          contact: "9000090000"
        },
        notes: {
          "address": "Razorpay Corporate Office"
        },
        theme: {
          "color": "#3399cc"
        },
        handler: async (response) => {
          try {
            const verificationResponse = await axios.post('https://ticket-booking-backend-rylx.onrender.com/api/paymentverification', {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              bookingDetails: payload,
            });

            const redirectURL = verificationResponse.data.redirectURL;
            if (redirectURL) {
              navigate(redirectURL);
            } else {
              console.error('Redirection URL not provided in response.');
            }
          } catch (error) {
            console.error('Error during payment verification:', error);
          }
        },
        modal: {
          ondismiss: function () {
            console.log("User closed the modal");
          }
        }
      };

      const razor = new window.Razorpay(options);
      razor.on('payment.failed', (response) => {
        console.error('Payment failed:', response.error);
      });
      razor.open();
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const displaySeats = selectedSeats.map(seat => `${seat.seatRow}-${seat.seatNumber}`).join(', ');

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-center items-center">
        <div className="cart-container flex flex-col w-1/2 p-6 bg-white shadow-md rounded-lg">
          <h1 className='text-3xl font-bold mb-4'>Booking Cart</h1>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{movieTitle}</h2>
            <p className="text-lg text-gray-600">{formatDisplayDate(selectedDate)}</p>
            <p className="text-lg text-gray-600">{selectedTimeSlot}</p>
          </div>

          {selectedSeats.length === 0 ? (
            <p className="text-lg text-gray-800">Your cart is empty. Please select seats to book.</p>
          ) : (
            <div className="mb-6">
              <div className="cart-item mb-4">
                <h2 className="text-xl font-semibold">Selected Seats:</h2>
                <p>{displaySeats}</p>
              </div>
              <div className="cart-summary">
                <h3 className="text-lg font-semibold">Total Seats: {selectedSeats.length}</h3>
                <h3 className="text-lg font-semibold">Total Price: ₹{totalPayment}</h3>
              </div>
            </div>
          )}

          {selectedSeats.length > 0 && (
            <div className="flex justify-center">
              <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 focus:outline-none" onClick={handlePayment}>
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
