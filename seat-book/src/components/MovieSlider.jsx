import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function MovieCarousel() {
  const [movies, setMovies] = useState([]); // State to hold your movie data

  useEffect(() => {
    axios.get('https://ticket-booking-backend-rylx.onrender.com/movies')
      .then(response => {
        setMovies(response.data.movies);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const settings = {
    // dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
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

  return (
    <div className="carousel-container overflow-x-hidden relative max-w-full">
      <Slider {...settings}>
        {Array.isArray(movies) && movies.map((movie) => (
          <div key={movie.uniqueId} className="relative">
            <Link to={`/movie/${movie.uniqueId}`} className="block">
              <div className="relative w-full" style={{ paddingBottom: '28.2%' }}> {/* Aspect ratio for 1064x300 */}
                <img src={movie.imageSrc} alt={movie.title} className="absolute inset-0 w-full h-full object-cover" />
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
