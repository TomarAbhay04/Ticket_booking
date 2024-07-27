import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function MovieCarousel() {
  const [movies, setMovies] = useState([]); // State to hold your movie data
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    axios.get('https://ticket-booking-tl5b.onrender.com/movies')
      .then(response => {
        setMovies(response.data.movies);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch(error => {
        console.log(error);
        setLoading(false); // Ensure loading is false in case of error
      });
  }, []);

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="carousel-container overflow-x-hidden relative max-w-full">
      <Slider {...settings}>
        {Array.isArray(movies) && movies.map((movie) => (
          <div key={movie.uniqueId} className="relative">
            <Link to={`/movie/${movie.uniqueId}`} className="block">
              <div className="relative" style={{ width: '1064px', height: '300px' }}> {/* Set fixed size */}
                <img
                  src={`data:image/jpeg;base64,${movie.imageSrc}`}
                  alt={movie.title}
                  className="absolute inset-0  object-cover"
                />
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded-full absolute bottom-4 left-1/2 transform -translate-x-1/2">
                Book Ticket
              </button>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default MovieCarousel;
