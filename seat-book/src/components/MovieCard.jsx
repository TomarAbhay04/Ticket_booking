import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function MovieCard() {
  const [movies, setMovies] = useState([]); // State to hold your movie data
  const [loading, setLoading] = useState(true); // State for loading
  const sliderRef = useRef(null); // Ref to control the slider

  useEffect(() => {
    axios.get('https://ticket-booking-backend-rylx.onrender.com/movies')
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
    <div className="max-w-screen-lg mt-10 mx-auto relative">
      <Slider {...settings} ref={sliderRef} className="space-x-4">
        {movies.map((movie) => (
          <div key={movie.uniqueId} className="relative rounded-lg overflow-hidden shadow-lg px-4">
            <Link to={`/movie/${movie.uniqueId}`} className="block">
              <img
                src={`data:image/jpeg;base64,${movie.imageSrc}`}
                alt={movie.title}
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
                <p className="text-gray-700">{movie.description}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full block w-1/3 text-center text-sm mt-2">
                  Book Ticket
                </button>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
      <button className="absolute top-1/2 transform -translate-y-14  bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full px-4 py-2" onClick={prevSlide}>
        &lt;
      </button>
      <button className="absolute top-1/2 transform -translate-y-14 right-1 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full px-4 py-2" onClick={nextSlide}>
        &gt;
      </button>
    </div>
  );
}

export default MovieCard;
