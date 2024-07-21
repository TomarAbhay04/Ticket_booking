import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 mb-4">
          At [Your Company Name], our mission is to revolutionize the way you experience cinema. We strive to make movie booking as seamless and enjoyable as possible, providing you with a user-friendly platform to discover, book, and enjoy the latest films.
        </p>
        <p className="text-lg text-gray-700">
          We believe in offering exceptional service and creating memorable experiences for our users. Whether you're booking tickets for the latest blockbuster or a classic film, we are here to ensure your movie-going experience is nothing short of perfect.
        </p>
      </section>
      
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
        <p className="text-lg text-gray-700 mb-4">
          Founded in [Year], [Your Company Name] began with a simple idea: to bring movie lovers closer to their favorite films with ease and convenience. From a small team of passionate movie enthusiasts, we've grown into a leading movie ticket booking platform, thanks to our commitment to innovation and customer satisfaction.
        </p>
        <p className="text-lg text-gray-700">
          Our journey has been fueled by our love for cinema and our dedication to improving the movie-going experience. We continually strive to enhance our platform and services to meet the evolving needs of our users.
        </p>
      </section>
      
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <img src="team-member1.jpg" alt="Team Member 1" className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Jane Doe</h3>
            <p className="text-gray-600">Founder & CEO</p>
            <p className="text-gray-700 mt-2">
              Jane is the visionary behind [Your Company Name], with a passion for cinema and a drive to create an exceptional movie booking experience.
            </p>
          </div>
          
          {/* Team Member 2 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <img src="team-member2.jpg" alt="Team Member 2" className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">John Smith</h3>
            <p className="text-gray-600">Chief Technology Officer</p>
            <p className="text-gray-700 mt-2">
              John leads our tech team, ensuring that our platform is innovative, reliable, and user-friendly.
            </p>
          </div>
          
          {/* Team Member 3 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <img src="team-member3.jpg" alt="Team Member 3" className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Emily Johnson</h3>
            <p className="text-gray-600">Customer Service Manager</p>
            <p className="text-gray-700 mt-2">
              Emily ensures that our users receive exceptional support and assistance throughout their movie booking journey.
            </p>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
        <p className="text-lg text-gray-700 mb-4">
          We would love to hear from you! If you have any questions, feedback, or suggestions, feel free to reach out to us.
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Email:</strong> support@example.com
        </p>
        <p className="text-lg text-gray-700">
          <strong>Phone:</strong> (123) 456-7890
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
