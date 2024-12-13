import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const user = {
    name: 'John Doe',
    role: 'Lecturer',
    profileImage: 'https://via.placeholder.com/40', // Replace with actual profile image URL
  };

  return (
    <nav className="bg-customGreen text-white py-3 px-6 shadow-md flex items-center justify-between sticky top-0">
      {/* Website Name */}
      <h1 className="text-customGray text-2xl font-bold">
        <Link to="/lecturer" className="hover:text-gray-500">
          Attendee
        </Link>
      </h1>

      {/* toggle button */}
      <FontAwesomeIcon icon={faBars} size='xl' className='md:hidden p-1 bg-gray-300 rounded bg-opacity-40' />

      {/* Links */}
      <div className="items-center space-x-6 hidden md:flex">
        <Link
          to="/lecturer"
          className="text-customGray hover:underline hover:text-gray-500 text-lg"
        >
          Home
        </Link>
        <Link
          to="/generate-token"
          className="text-customGray hover:underline hover:text-gray-500 text-lg"
        >
          Generate Token
        </Link>

        {/* User Profile */}
        <div className="flex items-center space-x-3 border-l-2 border-gray-100 pl-2">
          <div className="text-right">
            <p className="text-sm font-medium text-customgray">{user.name}</p>
            <p className="text-xs text-customgray">{user.role}</p>
          </div>
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-customGreen"
          />
        </div>
      </div>
    </nav>
  );
};


