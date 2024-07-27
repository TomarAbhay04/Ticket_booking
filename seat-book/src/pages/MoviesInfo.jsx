import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/global.css';  // Ensure this path is correct

function MovieInfo() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(`https://ticket-booking-tl5b.onrender.com/movies/${movieId}`);
        setMovie(response.data.movie);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [movieId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target) && showTrailer) {
        setShowTrailer(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showTrailer]);

  const getYouTubeVideoId = (url) => {
    const regExp = /^.*((youtube\.com\/watch\?v=)|(youtu\.be\/))([^"&?\/\s]{11})/;
    const match = url.match(regExp);
    return match ? match[4] : null;
  };

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

  const videoId = getYouTubeVideoId(movie.trailerLink);

  return (
    <div className="movie-info-container flex flex-col items-center p-1 min-h-screen bg-gray-500">
      <h1 className='text-4xl font-bold text-center my-2 text-white drop-shadow-lg'>{movie.title}</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start w-full md:w-3/4 rounded-lg shadow-lg p-4 bg-opacity-80 bg-gray-300">
        <div className="w-full md:w-1/2 p-2 relative" ref={containerRef}>
          {showTrailer ? (
            <div className="relative">
              <iframe
                width="100%"
                height="390"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="aspect-[252/378] w-auto md:w-1/2 p-2 relative">
              <img 
                src={`data:image/jpeg;base64,${movie.imageSrc}`} 
                alt={movie.title} 
                className='object-cover rounded-lg shadow-lg w-full h-full' 
              />
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2 p-2 mt-4">
          <div className=' px-4 text-black'>
            <p className="text-lg mb-4 py-2 "><strong>Language:</strong> {movie.language || "Not Available"}</p>
            <p className="text-lg mb-4"><strong>Duration:</strong> {movie.duration || "Not Available"}</p>
            <p className="text-lg mb-4"><strong>Format:</strong> {movie.format || "Not Available"}</p>
            <p className="text-lg mb-4"><strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString() || "Not Available"}</p>
            <p className="text-lg mb-4"><strong>Certificate:</strong> {movie.certificate || "Not Available"}</p>
            <p className="text-lg mb-4"><strong>Categories:</strong> {movie.categories?.length ? movie.categories.join(', ') : "Comedy, Drama"}</p>
          </div>
          <div className="flex space-x-4 mt-4">
            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500' onClick={handleTrailerClick}>Watch Trailer</button>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500' onClick={handleBookTicket}>Book Ticket</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
