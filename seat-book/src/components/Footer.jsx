import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-around">
        <div className="w-full md:w-1/3 lg:w-auto mb-6 md:mb-0">
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p>Email: info@example.com</p>
          <p>Phone: 123-456-7890</p>
        </div>
        <div className="w-full md:w-1/3 lg:w-auto mb-6 md:mb-0">
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
        <div className="w-full md:w-1/3 lg:w-auto mb-6 md:mb-0">
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <p>About Us</p>
          <p>FAQ</p>
          <p>Privacy Policy</p>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>&copy; 2024 MovieTicketBooking. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
