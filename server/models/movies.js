import mongoose from "mongoose";

// Seat schema
const seatSchema = new mongoose.Schema({
    seatNumber: { type: String, required: true },
    seatRow: { type: String, required: true },
    available: { type: Boolean, default: true }
});

// Movie slot schema
const movieSlotSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    timeSlots: [{
        timeSlot: { type: String, required: true },
        seats: [seatSchema], // Seats information for this time slot
        availableSeatsCount: { type: Number, default: 10 } // Optimization
    }]
});

// Movie schema
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    uniqueId: { type: String, required: true, unique: true },
    imageSrc: { type: String, required: true },
    trailerLink: { type: String },
    availableSlots: [movieSlotSchema] // Define availableSlots as an array of movieSlotSchema
});

// Theater schema
const theaterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String }
});

// Booking schema
const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    slot: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot' },
    seats: [seatSchema],
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' }
});

// Model definitions
const Movie = mongoose.model('Movie', movieSchema);
const Theater = mongoose.model('Theater', theaterSchema);
const Booking = mongoose.model('Booking', bookingSchema);

export default Movie;
