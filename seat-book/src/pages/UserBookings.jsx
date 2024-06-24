// Orders.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserAuth } from '../context/UserAuthContext';
import { Link } from 'react-router-dom';

const UserBookings = () => {
  const { user } = useUserAuth();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchBookings(user.uid);
    }
  }, [user]);

  const fetchBookings = async (userId) => {
    try {
      const { data } = await axios.get(`http://localhost:4000/api/bookings/${userId}`);
      setBookings(data.bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to fetch bookings.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
      {error && <p className="text-red-500">{error}</p>}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="border rounded-lg p-4 shadow">
              <h2 className="text-lg font-semibold mb-2">{booking.movieTitle}</h2>
              <p>Date: {new Date(booking.slot.date).toLocaleDateString()}</p>
              <p>Time Slot: {booking.slot.timeSlot}</p>
              <p>Seats: {booking.seats.map(seat => `${seat.seatRow}-${seat.seatNumber}`).join(', ')}</p>
              <p>Total Payment: Rs. {booking.totalPayment}</p>
            </div>
          ))}
        </div>
      )}
      <Link to="/"><button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Back to Home</button></Link>
    </div>
  );
};

export default UserBookings;
