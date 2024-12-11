// Import dependencies
import React, { useState } from 'react';
import { toast} from 'react-hot-toast';

export const Login = () => {
  const [formData, setFormData] = useState({
    regnum: '',
    password: '',
  });
  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.regnum || !formData.password) {
    //   setError('All fields are required.');/
      toast.error('All fields are required.');
    } else {
      setError('');
      toast.success('Login successful!');
      console.log('Login successful!', formData);
    }
  };

  return (
    <div className="bg-customGray min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h1 className="text-customGreen text-2xl font-bold mb-4 text-center">Login</h1>
        {/* {error && <p className="text-customOrange text-sm mb-4">{error}</p>} */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="regnum">
              Registration Number
            </label>
            <input
              type="regnum"
              id="regnum"
              name="regnum"
              value={formData.regnum}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-customGreen"
              placeholder="E.g NAS/STE/21/0001"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-customGreen"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-customGreen text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-customOrange"
          >
            Login
          </button>
        </form>
        {/* <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?{' '}
          <a href="#" className="text-customOrange hover:underline">
            Sign up
          </a>
        </p> */}
      </div>
    </div>
  );
};

