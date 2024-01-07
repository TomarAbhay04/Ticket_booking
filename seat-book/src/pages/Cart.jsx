import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { selectedSeats } from './Seat.jsx';

const Cart = () => {
  // Access the location object using useLocation
  const location = useLocation();
  // const navigate = useNavigate();

  // Access the selectedSeats from location state
  const seatsFromLocation = location.state?.selectedSeats || [];

  // Check if selectedSeats is undefined or null
  if (!seatsFromLocation) {
    return <p>Your cart is empty. Please select seats to book.</p>;
  }

  // console.log(totalPayment);

  const totalPayment = seatsFromLocation.length * 150;
  const handlePayment = async () => {
    // Redirect to the payment page
    // navigate('/cart');
    // navigate('/payment');

    try {
      // Check if totalPayment is a valid number
      // const totalPayment = seatsFromLocation.length * 150;
      if (typeof totalPayment !== 'number' || isNaN(totalPayment)) {
        console.error('Invalid totalPayment value:', totalPayment);
        return;
      }

      // Create a clean payload
      const payload = {
        // selectedSeats,
        totalPayment,
        // Add other necessary properties if needed
      };

      const { data: { key } } = await axios.get('http://localhost:4000/api/getkey')

      const { data: { order } } = await axios.post('http://localhost:4000/api/checkout', {
        totalPayment: totalPayment
      });

      // console.log(data);

      // Handle the response as needed



      const options = {
        // modal: {
        //   height: '100px', // Adjust the height value accordingly
        // }, it's not working but in feature it will work...
        key, // Enter the Key ID generated from the Dashboard
        amount: order.amount,
        currency: "INR",
        name: "Tomar Abhay",
        description: "enabling razorpay for react applications",
        image: "https://example.com/your_logo",
        order_id: order.id,
        callback_url: "http://localhost:4000/api/paymentverification",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000"
        },
        notes: {
          "address": "Razorpay Corporate Office"
        },
        theme: {
          "color": "#3399cc"
        }
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error('Error during checkout:', error);
    }

  };
  return (
    <div className="cart-container flex justify-center">
      <h1>Booking Cart</h1>
      {seatsFromLocation.length === 0 ? (
        <p>Your cart is empty. Please select seats to book.</p>
      ) : (
        <div>
          <div className="cart-item">
            <h2>Selected Seats:</h2>
            <ul>
              {seatsFromLocation.map((seatId) => (
                <li key={seatId}>{seatId}</li>
              ))}
            </ul>
          </div>
          <div className="cart-summary ">
            <h3>Total Seats: {seatsFromLocation.length}</h3>
            <h3>Total Price: Rs. {totalPayment}</h3>
          </div>
          {/* Add a button or a link to proceed to checkout */}
          {/* <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button> */}
          <button className="bg-blue-500 text-white px-4 py-2 rounded m-10" onClick={handlePayment}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
