import React, { useState } from 'react';

const ApplyForFranchise = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      if (/^\d{0,10}$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = {};

    // Validation
    if (!formData.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'A valid email is required';
      valid = false;
    }
    if (!formData.phone || formData.phone.length !== 10) {
      newErrors.phone = 'A valid 10-digit phone number is required';
      valid = false;
    }
    if (!formData.company) {
      newErrors.company = 'Company name is required';
      valid = false;
    }
    if (!formData.location) {
      newErrors.location = 'Location is required';
      valid = false;
    }
    if (!formData.message) {
      newErrors.message = 'Message is required';
      valid = false;
    }

    if (valid) {
      setFormSubmitted(true);
      // Simulate form submission
      // Replace with actual form submission logic
      console.log('Form submitted:', formData);
      // Here you can add code to send the form data to your server or email
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6">
      <div className="w-full max-w-lg  p-2 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-2 text-black text-center">Apply For Franchise </h1>

        <section className="p-6">
          {/* <h2 className="text-3xl font-semibold mb-4 text-black text-center">Franchise Application Form</h2> */}
          {formSubmitted ? (
            <p className="text-green-700 text-center">Thank you for your interest! We will get back to you soon.</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-black mb-2" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-black focus:outline-none focus:border-black rounded-full"
                />
                {errors.name && <p className="text-red-600">{errors.name}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-black mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-black  focus:outline-none focus:border-black rounded-full"
                />
                {errors.email && <p className="text-red-600">{errors.email}</p>}
              </div>

              <div className="mb-4">  
                <label className="block text-black mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-black  focus:outline-none focus:border-black rounded-full"
                  maxLength="10"
                />
                {errors.phone && <p className="text-red-600">{errors.phone}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-black mb-2" htmlFor="company">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full p-2 border border-black  focus:outline-none focus:border-black rounded-full"
                />
                {errors.company && <p className="text-red-600">{errors.company}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-black mb-2" htmlFor="location">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 border border-black focus:outline-none focus:border-black rounded-full"
                />
                {errors.location && <p className="text-red-600">{errors.location}</p>}
              </div>

              {/* <div className="mb-4">
                <label className="block text-black mb-2" htmlFor="message">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border border-black focus:outline-none focus:border-black rounded-lg"
                  rows="4"
                ></textarea>
                {errors.message && <p className="text-red-600">{errors.message}</p>}
              </div> */}

              <button
                type="submit"
                className="bg-black text-white w-full p-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
              >
                Submit Application
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};

export default ApplyForFranchise;
