// const Movie = require('./movieModel');
import Movie from '../models/movies.js'
import mongoose from 'mongoose';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

// Load environment variables from the config folder
const __dirname = path.dirname(fileURLToPath(import.meta.url));

config({ path: path.resolve(__dirname, '..', 'config', 'config.env') });
console.log('MongoDB URI:', process.env.MONGODB_URI);

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            bufferCommands: false, // Disable mongoose buffering
        });
        console.log('Connected to MongoDB');

        // Sample data for slots
        const slotsData = [
            { date: new Date('2024-03-09'), timeSlot: '10:00 AM' },
            { date: new Date('2024-03-09'), timeSlot: '02:00 PM' },
            { date: new Date('2024-03-09'), timeSlot: '06:00 PM' },
            // Add more slots as needed
        ];

        // Create a movie document
        const movieData = {
            title: 'Teri Batton mein me',
            description: 'Teri Batton mein me',
            imageSrc: 'https://i.ytimg.com/vi/w_N6d4ec79c/maxresdefault.jpg',
            video: 'https://www.youtube.com/watch?v=w_N6d4ec79c',
            category: 'Bollywood',
            uniqueId: '1',
            availableSlots: slotsData.map(slot => ({
                date: slot.date,
                timeSlot: slot.timeSlot,
                seats: Array.from({ length: 10 }, (_, i) => ({
                    seatNumber: i + 1,
                    available: true
                }))
            }))
        };

        // Check if movie with the same uniqueId exists in the database
        const existingMovie = await Movie.findOne({ uniqueId: movieData.uniqueId });

        if (!existingMovie) {
            // Create a movie document
            const movie = new Movie(movieData);

            // Save the movie document
            await movie.save();

            // Save data to JSON file
            await fs.writeFile(path.join(__dirname, 'movie_data.json'), JSON.stringify(movieData, null, 2));
        } else {
            // Check if the seat data is the same
            const isSameSeatsData = JSON.stringify(existingMovie.availableSlots) === JSON.stringify(movieData.availableSlots);

            if (!isSameSeatsData) {
                // Update existing movie document with new seat data
                existingMovie.availableSlots = movieData.availableSlots;
                await existingMovie.save();

                // Save data to JSON file
                await fs.writeFile(path.join(__dirname, 'movie_data.json'), JSON.stringify(movieData, null, 2));
            } else {
                console.log('No changes in seat data.');
            }
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        mongoose.disconnect();
    }
})();
