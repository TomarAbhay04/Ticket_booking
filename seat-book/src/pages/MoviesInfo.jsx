import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import { FaYoutube } from 'react-icons/fa';

function MovieInfo() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(`https://ticket-booking-backend-rylx.onrender.com/movies/${movieId}`);
        setMovie(response.data.movie);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [movieId]);

  const handleBookTicket = () => {
    navigate(`/movie/${movieId}/seat`, { state: { movieTitle: movie.title, selectedMovie: movie._id } });
  };

  const handleTrailerClick = () => {
    setShowTrailer(true);
  };

  if (!movieId) {
    return <div>Movie ID not found.</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className='text-3xl text-center my-4'>{movie.title}</h1>

      <div className="relative w-full md:w-1/2 mb-4">
        {showTrailer ? (
          <YouTube videoId={movie.trailerLink.split('v=')[1]} className='w-full h-full' opts={{ height: '390', width: '100%' }} />
        ) : (
          <div className="relative cursor-pointer" onClick={handleTrailerClick}>
            <img src={movie.imageSrc} alt={movie.title} className='w-full h-auto rounded-lg shadow-lg' />
            <FaYoutube className="absolute inset-0 m-auto text-red-600 text-6xl cursor-pointer" />
          </div>
        )}
      </div>

      <button className='bg-blue-500 text-white px-4 py-2 rounded-lg m-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500' onClick={handleBookTicket}>Book Ticket</button>
    </div>
  );
}

export default MovieInfo;
