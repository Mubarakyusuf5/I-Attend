import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../Context/AuthContext';
 
export const StudentPage = () => {
  const { user } = useAuth()
  const [token, setToken] = useState('');
  const [studentId] = useState(user?._id); 

  const firstName = user?.fullname.split(" ")[0];


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token.trim()) {
      toast.error('Token is required.');
      return;
    }

    try {
      // Make API request to validate token and mark attendance
      const {data} = await axios.post('/api/lecturer/markAttendance', {
        studentId,
        tokenInput: token,
      });

      // If successful, display success message
      toast.success(data.message);
      // console.log('Attendance marked:', data);

      // Clear the token input field
      setToken('');
    } catch (error) {
      // Handle errors
      if (error.response) {
        // Display backend error messages
        toast.error(error.response.data.message);
      } else {
        // Handle network or unexpected errors
        toast.error('An error occurred. Please try again later.');
      }
    }
  };


  return (
    <div className="bg-customGray min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h1 className="text-customGreen text-2xl font-bold mb-4 text-center">Welcome, {firstName}!</h1>
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


