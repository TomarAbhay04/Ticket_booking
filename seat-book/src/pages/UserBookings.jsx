import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useUserAuth } from '../context/UserAuthContext';
import { Link } from 'react-router-dom';

const UserBookings = () => {
  const { user } = useUserAuth();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const endOfPageRef = useRef(null); // Reference to scroll to

  useEffect(() => {
    if (user) {
      fetchBookings(user.uid);
    }
  }, [user]);

  useEffect(() => {
    // Scroll to the bottom when bookings are fetched
    if (endOfPageRef.current) {
      endOfPageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [bookings]);

  const fetchBookings = async (userId) => {
    try {
      const { data } = await axios.get(`https://ticket-booking-tl5b.onrender.com/api/bookings/${userId}`);
      console.log('Fetched bookings:', data.bookings);
      setBookings(prevBookings => {
        if (JSON.stringify(prevBookings) !== JSON.stringify(data.bookings)) {
          return data.bookings;
        }
        return prevBookings;
      });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to fetch bookings.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }
  if(error){
    return <div className='container mx-auto p-4 text-red-500'>{error}</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
      {error && <p className="text-red-500">{error}</p>}
      {(!error && bookings.length === 0) ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="border rounded-lg p-4 shadow bg-white">
              <h2 className="text-lg font-semibold mb-2">{booking.movieTitle}</h2>
              <p className="mb-2">Date: {new Date(booking.slot.date).toLocaleDateString()}</p>
              <p className="mb-2">Time Slot: {booking.slot.timeSlot}</p>
              <p className="mb-2">Seats: {booking.seats.map(seat => `${seat.seatRow}-${seat.seatNumber}`).join(', ')}</p>
              <p className="mb-2">Total Payment: Rs. {booking.totalPayment}</p>
              <p className="mb-2">Booked At: 
                {booking.bookedAt 
                  ? new Date(booking.bookedAt).toLocaleString() 
                  : ' Not Available'}
              </p>
              <p className="font-medium">
                Payment Status: <span className={booking.paymentStatus === 'Paid' ? 'text-green-500' : 'text-red-500'}>{booking.paymentStatus}</span>
              </p>
            </div>
          ))}
        </div>
      )}
      {/* Scroll to bottom reference */}
      <div ref={endOfPageRef} />
      <Link to="/">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Back to Home</button>
      </Link>
    </div>
  );
};

export default UserBookings;
