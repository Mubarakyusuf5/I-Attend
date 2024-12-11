import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
 
export const StudentPage = () => {
  const [token, setToken] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token.trim()) {
      toast.error('Token is required.');
    } else if (token.length !== 6) {
      toast.error('Invalid token. Token must be 6 characters long.');
    } else {
      toast.success('Attendance marked successfully!');
      console.log('Token submitted:', token);
      setToken(''); // Clear the input field
    }
  };

  return (
    <div className="bg-customGray min-h-screen flex flex-col items-center justify-center p-4">
      <Toaster position="top-center" />
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h1 className="text-customGreen text-2xl font-bold mb-4 text-center">Welcome, Student!</h1>
        <p className="text-gray-700 text-center mb-6">Please enter your attendance token below.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="token">
              Attendance Token
            </label>
            <input
              type="text"
              id="token"
              name="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-customGreen"
              placeholder="Enter your token"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-customGreen text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-customOrange"
          >
            Submit Token
          </button>
        </form>
      </div>
    </div>
  );
};


