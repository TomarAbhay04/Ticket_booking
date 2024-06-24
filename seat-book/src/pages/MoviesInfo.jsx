import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function MovieInfo() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  const handleBookTicket = () => {
    navigate(`/movie/${movieId}/seat`, { state: { movieTitle: movie.title, selectedMovie: movie._id } });
  } 

  useEffect(() => {
    console.log("Fetching movie data for movieId:", movieId);
    axios.get(`http://localhost:4000/movies/${movieId}`)
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



  // const movie2 = movies.find(movie => movie.uniquId === movieId);

  return (
    <div>

      <div key={movie.uniqueId}>
        <h1 className='text-3xl text-center my-4'>{movie.title}</h1>
        {/* <h1 className='text-4xl text-center my-2'>{movie._id}</h1> */}
        {/* <p>{movie.description}</p> */}
        <Link to={movie.trailerLink}>
          <img src={movie.imageSrc} alt={movie.title} className='w-1/2 h-1/2 m-auto' />
        </Link>
        {/* <p>Duration: {movie.duration}</p> */}
        <button className='bg-blue-500 text-white px-2 py-2 rounded-lg m-1' onClick={handleBookTicket}>Book Ticket</button>
      </div>

    </div>
  );
}

export default MovieInfo;
