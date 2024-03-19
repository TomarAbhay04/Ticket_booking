import mongoose from 'mongoose';
import Movie from '../models/movies.js';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Load environment variables from the config folder
const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.resolve(__dirname, '..', 'config', 'config.env') });

console.log('MongoDB URI:', process.env.MONGODB_URI);

// Function to generate JSON data
const generateMovieData = () => {
    const movies = [];
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    for (let i = 1; i <= 5; i++) {
        const slotsData = [];
        // Generate slots for each day
        for (let j = 0; j < 3; j++) {
            const date = new Date();
            date.setDate(date.getDate() + j); // Increment date for each day
            const formattedDate = daysOfWeek[date.getDay()] + ' ' + date.getDate() + ' ' + months[date.getMonth()];
                        const slots = {
                date: date,
                timeSlots: [
                    { timeSlot: '10:00 AM', seats: generateSeatsData(100) },
                    { timeSlot: '02:00 PM', seats: generateSeatsData(100) },
                    { timeSlot: '06:00 PM', seats: generateSeatsData(100) }
                ]
            };
            slotsData.push(slots);
        }

        const movie = {
            title: `Movie ${i}`,
            description: `Description of Movie ${i}`,
            uniqueId: `movie_${i}`,
            imageSrc: `https://example.com/movie_${i}.jpg`,
            trailerLink: `https://www.youtube.com/watch?v=trailer_${i}`,
            availableSlots: slotsData
        };

        movies.push(movie);
    }
    return movies;
};

// Function to generate seats data
// Function to generate seats data
// Function to generate seats data with seat numbers and rows
const generateSeatsData = (count) => {
    const seats = [];
    const seatsPerRow = 10;
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']; // Define rows
    for (let i = 0; i < count; i++) {
        const seatNumber = ((i % seatsPerRow) + 1); // Calculate seat number in cyclical pattern from 1 to 10
        const row = rows[Math.floor(i / seatsPerRow)]; // Assign row based on index
        const seat = {
            seatNumber: `${seatNumber}`, // Combine row and seat number
            seatRow: row, // Assign row
            available: true
        };
        seats.push(seat);
    }
    return seats;
};



(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            bufferCommands: false // Disable mongoose buffering
        });
        console.log('Connected to MongoDB');

        // Generate JSON data
        const newMoviesData = generateMovieData();

        // Load existing data from the database
        const existingMoviesData = await Movie.find({}, '-_id -__v');

        // Check for changes and update existing data
        const modifiedMoviesData = newMoviesData.map(newMovie => {
            const existingMovie = existingMoviesData.find(movie => movie.uniqueId === newMovie.uniqueId);
            if (existingMovie) {
                const modifiedSlots = newMovie.availableSlots.map(newSlot => {
                    const existingSlot = existingMovie.availableSlots.find(slot => slot.date.getTime() === newSlot.date.getTime());
                    if (existingSlot) {
                        return { ...existingSlot.toObject(), ...newSlot };
                    }
                    return newSlot;
                });
                return { ...existingMovie.toObject(), ...newMovie, availableSlots: modifiedSlots };
            }
            return newMovie;
        });

        // Update movies data in the database
        await Movie.deleteMany({});
        await Movie.insertMany(modifiedMoviesData);

        // Write JSON data to a file
        const jsonData = JSON.stringify(modifiedMoviesData, null, 2);
        fs.writeFileSync(path.join(__dirname, 'movie_data.json'), jsonData, 'utf-8');

        console.log('Movie data has been updated in the "movies" collection and movie_data.json file.');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        mongoose.disconnect();
    }
})();
