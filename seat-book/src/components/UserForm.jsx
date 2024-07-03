import { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    displayName: '',
    role: 'passenger',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting form data:', formData); // Log payload before sending
      const response = await axios.post('https://ticket-booking-backend-rylx.onrender.com/api/user', formData);
      alert('User created successfully');
      console.log(response.data);
    } catch (error) {
      alert('Error creating user');
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        value={formData.email} 
        onChange={handleChange} 
        required 
      />
      <input 
        type="text" 
        name="displayName" 
        placeholder="Display Name" 
        value={formData.displayName} 
        onChange={handleChange} 
        required 
      />
      <select 
        name="role" 
        value={formData.role} 
        onChange={handleChange} 
        required
      >
        <option value="passenger">Passenger</option>
        <option value="staff">Staff</option>
        <option value="admin">Admin</option>
      </select>
      <input 
        type="text" 
        name="phoneNumber" 
        placeholder="Phone Number" 
        value={formData.phoneNumber} 
        onChange={handleChange} 
        required 
      />
      <button type="submit">Create User</button>
    </form>
  );
};

export default UserForm;
