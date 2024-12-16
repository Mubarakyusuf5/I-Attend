// Import dependencies
import React, { useEffect, useState } from 'react';
import { toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';

export const Login = () => {
  const [formData, setFormData] = useState({
    regnum: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [User, setUser] = useState(null)

  useEffect(() => {
    // Parse user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.regnum || !formData.password) {
      toast.error('All fields are required.');
      setLoading(false);
    } 

    try {
      const response = await axios.post("/auth/login", formData);
      login(response.data.user); // Update the user context
      
      const { role } = response.data.user; // Access role inside user object
      const message = response.data.message;

      // Use a separate function to handle redirection
      redirectUser(role);
      
      toast.success(message || "Login successful");
    } catch (error) {
      toast.error(error.response?.data?.message);
      setLoading(false); // Stop loading regardless of success or error
    } 
  };

    // Function to handle user redirection
    const redirectUser = (role) => {
      if (user) {
        navigate(role === 'Lecturer' ? '/Lecturer/dashboard' : '/Student');
      }
    };
  
    useEffect(() => {
      if (user) {
        // Redirect if user is already logged in
        redirectUser(user.role);
      }
    }, [user, navigate]);

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
              autoComplete='off'
            />
          </div>
          <button
            type="submit"
            className="w-full bg-customGreen text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-customOrange"
            disabled={loading}
          >
            {loading ? "Logging" : "Login"}
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

