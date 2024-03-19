import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


function MovieCarousel() {
  const [movies, setMovies] = useState([]); // State to hold your movie data


  useEffect(() => {
    axios.get('http://localhost:4000/movies')
      .then(response => {
        console.log(response.data.movies);
        setMovies(response.data.movies);
      })
      .catch(error => {
        console.log(error);
      });

  }, []);
  //  console.log(movies);

  // fetch method
  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     const response = await fetch('/movies');
  //     const data = await response.json();
  //     setMovies(data);
  //   };

  //   fetchMovies();
  // }, []); // Empty dependency array: Fetch data once on component mount

  const settings = {
    dots: false, // Hide dots at the bottom
    infinite: true,
    // speed: 2000,
    autoplay: true,   // Autoplay
    autoplaySpeed: 2000, // 3 seconds per slide
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // const movieImages = [
  //   { src: movie1, alt: "Movie 1" },
  //   { src: movie2, alt: "Movie 2" },
  //    { src: movie3, alt: "Movie 3" },
  // ];

  // console.log(movieImages.map((movie) => movie.src));

  return (
    <div className="carousel-container overflow-x-hidden relative">
      <Slider {...settings}>
        {Array.isArray(movies) && movies.map((movie) => (

          <div key={movie.uniqueId} >
            <Link to={`/movie/${movie.uniqueId}`}>
              <img src={movie.imageSrc} alt={movie.title} className="carousel-image w-full " />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 my-2 rounded-full">Book Ticket</button>
            </Link>
          </div>
        ))}

      </Slider>

    </div>

  );

}

export default MovieCarousel;