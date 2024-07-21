// MovieCard.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/MovieCard.css'; // Import your custom CSS file for styling

function MovieCard() {
  const [movies, setMovies] = useState([]); // State to hold your movie data
  const [loading, setLoading] = useState(true); // State for loading
  const sliderRef = useRef(null); // Ref to control the slider

  useEffect(() => {
    axios.get('https://server-1-yqmm.onrender.com/movies')
      .then(response => {
        setMovies(response.data.movies);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch(error => {
        console.log(error);
        setLoading(false); // Ensure loading is false in case of error
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
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

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className="relative max-w-screen-lg mt-10 mx-auto">
      <Slider {...settings} ref={sliderRef}>
        {movies.map((movie) => (
          <div key={movie.uniqueId} className="relative rounded-lg overflow-hidden shadow-lg p-2">
            <div className="slider-item-container relative">
              <Link to={`/movie/${movie.uniqueId}`} className="block">
                <img
                  src={`data:image/jpeg;base64,${movie.imageSrc}`}
                  alt={movie.title}
                  className="w-full h-64 sm:h-80 object-cover rounded-lg"
                />
                <div className="p-2 sm:p-4">
                  <h2 className="text-lg sm:text-xl font-bold mb-2">{movie.title}</h2>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full block w-full sm:w-1/3 text-center text-sm mt-2">
                    Book Ticket
                  </button>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
      <button className="custom-slider-button prev-slide-button" onClick={prevSlide}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 21 35">
          <g fill="#FFFFFF" fillRule="evenodd">
            <path d="M1.276 31.647a1.543 1.543 0 01.033-2.17l14.59-14.09a1.531 1.531 0 012.171.043c.59.61.566 1.592-.033 2.17L3.447 31.69a1.531 1.531 0 01-2.17-.043z"></path>
            <path d="M1.276 1.43A1.543 1.543 0 001.31 3.6L15.9 17.69a1.531 1.531 0 002.171-.043 1.543 1.543 0 00-.033-2.17L3.447 1.387a1.531 1.531 0 00-2.17.043z"></path>
          </g>
        </svg>
      </button>
      <button className="custom-slider-button next-slide-button" onClick={nextSlide}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 21 35">
          <g fill="#FFFFFF" fillRule="evenodd">
            <path d="M1.276 31.647a1.543 1.543 0 01.033-2.17l14.59-14.09a1.531 1.531 0 012.171.043c.59.61.566 1.592-.033 2.17L3.447 31.69a1.531 1.531 0 01-2.17-.043z"></path>
            <path d="M1.276 1.43A1.543 1.543 0 001.31 3.6L15.9 17.69a1.531 1.531 0 002.171-.043 1.543 1.543 0 00-.033-2.17L3.447 1.387a1.531 1.531 0 00-2.17.043z"></path>
          </g>
        </svg>
      </button>
    </div>
  );
}

export default MovieCard;
