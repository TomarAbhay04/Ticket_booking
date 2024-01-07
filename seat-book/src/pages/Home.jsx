import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx'; 

const Home = () => {
  const navigate = useNavigate();
const handleBookNowClick = () => {
  // Redirect to the Seat page
  navigate('/seat');
};
  return (
    <div className="bg-gray-100">
      <Navbar />
      {/* Hero Section */}

      {/* Carousel Section */}
      <div className="mt-4">
        {/* Carousel component for displaying movies */}
        {/* Consider using a third-party carousel library or creating your own component */}
      </div>

      {/* Search Box Section */}
      <div className="container mx-auto mt-4">
        <div className="flex items-center justify-center">
          {/* Search box component */}
          {/* Include dropdowns for movie, date, and time selection */}
          {/* <Link to="/seat" /> */}
          <button onClick={handleBookNowClick} className="bg-blue-500 text-white px-4 py-2 ml-2 rounded ">Book Now</button>
        </div>
      </div>

      {/* Movie Display Section */}
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* Map through your movie data and display each movie */}
          {/* Movie component should include an image, title, and a link to the movie details page */}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white p-4 mt-8">
        {/* Footer content */}
        {/* Include links to important pages, social media icons, and contact information */}
      </footer>
    </div>
  );
};

export default Home;
