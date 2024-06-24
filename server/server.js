import app from './app.js'; // Import your Express app
import Razorpay from 'razorpay';
import { config } from "dotenv"; // Import dotenv
import mongoose from 'mongoose'; // Import Mongoose
import fs from 'fs';
import {Movie} from './models/movies.js';
config({ path: "./config/config.env" });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI,{
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true

  // bufferCommands: false, // Disable mongoose buffering
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB: ', err));

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// Read and parse movies.json file
// try{
// const moviesData = JSON.parse(fs.readFileSync('./movie_data/movies.json', 'utf-8'));

// Upload data into the existing collection
// Update existing documents or insert new ones
// for (const movieData of moviesData) {
//   const { uniqueId, ...update } = movieData;
  // const { uniqueId, availableSlots, ...update } = movieData;
  // const availableSlots = movieData.availableSlots;

  // Update movie document if it exists, otherwise insert a new one
//   const updatedMovie = await Movie.findOneAndUpdate(
//     { uniqueId },
//     update,
//     { upsert: true, new: true }
// );

// If the movie was updated or inserted successfully, update availableSlots
// if (updatedMovie) {
  // Find the corresponding movie document by uniqueId
  // const movie = await Movie.findOne({ uniqueId });

  // If the movie is found, update the availableSlots field
  // if (movie) {
  //     movie.availableSlots = availableSlots;
  //     await movie.save(); // Save the updated movie document
  // }
// }
  // await Movie.findOneAndUpdate(
  //     { uniqueId},
  //     update,
  //     { upsert: true, new: true }
  // );
  // await Movie.findOneAndUpdate(
  //   {}
  // )
// }
// console.log('Movies data uploaded successfully')
// } catch (err) {
//      console.error('Error uploading movies data: ', err);
// }

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

