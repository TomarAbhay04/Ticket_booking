import React, { useState } from 'react';

const HelpAndSupport = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'A valid email is required';
      valid = false;
    }
    if (!formData.message) {
      newErrors.message = 'Message is required';
      valid = false;
    }

    if (valid) {
      setFormSubmitted(true);
      // Handle form submission logic here
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Help & Support</h1>

      {/* Contact Form */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        {formSubmitted ? (
          <p className="text-green-600">Thank you for your message. We will get back to you soon!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.name && <p className="text-red-600">{errors.name}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.email && <p className="text-red-600">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows="4"
              ></textarea>
              {errors.message && <p className="text-red-600">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>
        )}
      </div>

      {/* FAQs */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions (FAQs)</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">How can I book a movie ticket?</h3>
          <p>You can book a movie ticket by selecting the movie, choosing the showtime, and proceeding to payment. Visit our booking page for more details.</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">What is your refund policy?</h3>
          <p>We offer refunds for tickets canceled within 24 hours of booking. For more information, please refer to our refund policy page.</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">How can I contact customer support?</h3>
          <p>You can contact customer support via the contact form on this page or by emailing us at support@example.com.</p>
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupport;
