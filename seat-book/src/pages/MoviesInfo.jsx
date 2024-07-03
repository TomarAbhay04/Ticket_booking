import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube'; // Import YouTube component
import { FaYoutube } from 'react-icons/fa'; // Import YouTube icon from react-icons

function MovieInfo() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false); // State to manage trailer visibility
  const navigate = useNavigate();

  const handleBookTicket = () => {
    navigate(`/movie/${movieId}/seat`, { state: { movieTitle: movie.title, selectedMovie: movie._id } });
  }

  const handleTrailerClick = () => {
    setShowTrailer(true);
  }

  useEffect(() => {
    console.log("Fetching movie data for movieId:", movieId);
    axios.get(`https://ticket-booking-backend-rylx.onrender.com/movies/${movieId}`)
      .then(response => {
        console.log("Fetched movie data:", response.data.movie);
        setMovie(response.data.movie);
      })
      .catch(error => {
        console.log("Error fetching movie data:", error);
      });
  }, [movieId]);

  if (!movieId) {
    return <div>Movie ID not found.</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className='text-3xl text-center my-4'>{movie.title}</h1>

      <div className="relative w-1/2">
        {showTrailer ? (
          <YouTube videoId={movie.trailerLink.split('v=')[1]} className='w-full h-full' opts={{ height: '390', width: '100%' }} />
        ) : (
          <div className="relative cursor-pointer" onClick={handleTrailerClick}>
            <img src={movie.imageSrc} alt={movie.title} className='w-full h-auto' />
            <FaYoutube className="absolute inset-0 m-auto text-red-600 text-6xl" />
          </div>
        )}
      </div>

      <button className='bg-blue-500 text-white px-2 py-2 rounded-lg m-1' onClick={handleBookTicket}>Book Ticket</button>
    </div>
  );
}

export default MovieInfo;
