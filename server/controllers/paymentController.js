import crypto from 'crypto';
import { instance } from "../server.js";
import { Payment } from "../models/paymentModel.js";
import { Movie, Booking } from "../models/movies.js"; // Booking model
import { type } from 'os';

export const checkout = async (req, res) => {
  try {
    const { totalPayment } = req.body;
    if (!totalPayment || typeof totalPayment !== 'number' || isNaN(totalPayment)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid totalPayment provided'
      });
    }

    const options = {
      amount: Number(totalPayment * 100),
      currency: "INR",
    };

    const order = await instance.orders.create(options);
    console.log(order);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};



export const paymentVerification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, bookingDetails } = req.body;
  console.log(req.body);

  const verifySignature = (data, razorpaySignature, secret) => {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(`${data.order_id}|${data.payment_id}`);
    const generatedSignature = hmac.digest('hex');
    return generatedSignature === razorpaySignature;
  };

  try {
    const isValid = verifySignature({
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id
    }, razorpay_signature, process.env.RAZORPAY_API_SECRET);

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    const { userId, selectedMovie, selectedDate, selectedTimeSlot, selectedSeats, totalPayment } = bookingDetails;

    // Ensure selectedDate is a valid date object
    const date = new Date(selectedDate);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    const movie = await Movie.findById(selectedMovie);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    const movieTitle = movie.title;
    

    // Log the details for debugging
    console.log("Debug Details:");
    console.log("Movie ID:", selectedMovie, typeof selectedMovie);
    console.log("Date:", date);
    console.log("Time Slot:", selectedTimeSlot);
    console.log("Selected Seats:", selectedSeats);
    console.log(razorpay_payment_id, razorpay_order_id ,razorpay_signature);

    // Update the availability of the selected seats
    const updateResult = await Movie.updateOne(
      {
        _id: selectedMovie,
        'availableSlots.date': date,
        'availableSlots.timeSlots.timeSlot': selectedTimeSlot
      },
      {
        $set: selectedSeats.reduce((acc, seat) => {
          acc[`availableSlots.$[slot].timeSlots.$[timeSlot].seats.$[seat].available`] = false;
          return acc;
        }, {})
      },
      {
        arrayFilters: [
          { 'slot.date': date },
          { 'timeSlot.timeSlot': selectedTimeSlot },
          { 'seat.seatNumber': { $in: selectedSeats.map(seat => seat.seatNumber) } }
        ]
      }
    );

    console.log("Update Result:", updateResult);

    if (updateResult.matchedCount === 0 || updateResult.modifiedCount === 0) {
      return res.status(404).json({ message: 'No seats were updated. Check if the provided details are correct.' });
    }

    // Save the booking details
    const booking = new Booking({
      // user: req.user._id, // assuming you have user info in req.user
      userId,
      movie: selectedMovie,
      slot: {
        date: date,
        timeSlot: selectedTimeSlot
      },
      totalPayment: totalPayment,
      movieTitle: movieTitle,
      seats: selectedSeats.map(seat => ({ ...seat, available: false })),
      paymentStatus: 'paid'
    });

    await booking.save();

    console.log("Booking saved successfully, redirecting...");

    res.status(200).json({
      message: 'Payment verified successfully',
      redirectURL: `/paymentsuccess?reference=${razorpay_payment_id}`
    });

    console.log("Redirection triggered successfully.");
    
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Error updating seats', error });
  }
};


export const getBookingsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ userId });

    if (!bookings) {
      return res.status(404).json({ message: 'No bookings found for this user.' });
    }

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};