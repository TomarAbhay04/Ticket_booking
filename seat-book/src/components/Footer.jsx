import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 text-black py-4 md:py-6 mt-5">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg font-bold mb-2">Contact Us</h3>
          <ul className="space-y-1">
            <li>Email: info@example.com</li>
            <li>Phone: 123-456-7890</li>
          </ul>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg font-bold mb-2">Follow Us</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Facebook</a></li>
            <li><a href="#" className="hover:underline">Twitter</a></li>
            <li><a href="#" className="hover:underline">Instagram</a></li>
          </ul>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg font-bold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="/aboutus" className="hover:underline">About Us</a></li>
            <li><a href="/Apply For Franchise" className="hover:underline">Apply For Franchise</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-4 md:mt-6 border-t border-gray-700 pt-4">
        <p>&copy; 2024 MovieTicketBooking. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
