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
    navigate(`/movie/${movieId}/seat`, { state: { movieTitle: movie.title, selectedMovie: movie._id, movieImage: `data:image/jpeg;base64,${movie.imageSrc}` } });
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
    <div className="flex flex-col items-center p-4">
      <h1 className='text-3xl text-center my-4'>{movie.title}</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start w-full md:w-3/4">
        <div className="w-full md:w-1/2 p-2">
          {showTrailer ? (
            <YouTube videoId={movie.trailerLink.split('v=')[1]} className='w-full h-full' opts={{ height: '390', width: '100%' }} />
          ) : (
            <div className="relative cursor-pointer" onClick={handleTrailerClick}>
              <img src={`data:image/jpeg;base64,${movie.imageSrc}`} alt={movie.title} className='w-50 h-80 rounded-lg shadow-lg' />
              <FaYoutube className="absolute inset-0 m-auto text-red-600 text-6xl cursor-pointer" />
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2 p-2">
          <p className="text-lg mb-4">{movie.description}</p>
          <p className="text-lg mb-4">{movie.title}</p>
          {/* <p className="text-lg mb-4"><strong>Duration:</strong> {movie.duration} minutes</p> */}
          {/* <p className="text-lg mb-4"><strong>Director:</strong> {movie.director}</p>
          <p className="text-lg mb-4"><strong>Cast:</strong> {movie.cast.join(', ')}</p>
          <p className="text-lg mb-4"><strong>Genre:</strong> {movie.genre.join(', ')}</p> */}
          {/* <p className="text-lg mb-4"><strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p> */}
          <button className='bg-blue-500 text-white px-4 py-2 rounded-lg m-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500' onClick={handleBookTicket}>Book Ticket</button>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
