import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserAuth } from '../context/UserAuthContext';  

const Cart = () => {
  const { user } = useUserAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { movieTitle, selectedSeats, selectedMovie, selectedDate, selectedTimeSlot } = location.state || {};
  const totalPayment = selectedSeats?.length * 150;

  const handlePayment = async () => {
    if(!user) {
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

      const { data: { key } } = await axios.get('http://localhost:4000/api/getkey');

      const { data: { order } } = await axios.post('http://localhost:4000/api/checkout', payload);

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
            const verificationResponse = await axios.post('http://localhost:4000/api/paymentverification', {
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
    <div className="flex justify-center items-center h-full">
      <div className="cart-container flex justify-center flex-col">
        <h1 className='mb-4'>Booking Cart</h1>
        <h1>{movieTitle}</h1>
        <h1>{selectedDate}</h1>
        <h1>{selectedTimeSlot}</h1>

        {selectedSeats.length === 0 ? (
          <p>Your cart is empty. Please select seats to book.</p>
        ) : (
          <div>
            <div className="cart-item">
              <h2>Your Seats: {displaySeats}</h2>
            </div>
            <div className="cart-summary">
              <h3>Total Seats: {selectedSeats.length}</h3>
              <h3>Total Price: Rs. {totalPayment}</h3>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded m-10" onClick={handlePayment}>Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
