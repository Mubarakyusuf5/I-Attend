import React from 'react';
import { Link } from 'react-router-dom';

export const LecturerPage = () => {
  const dummyStudentData = [
    { id: 1, name: 'John Doe', course: 'Math 101' },
    { id: 2, name: 'Jane Smith', course: 'History 102' },
    { id: 3, name: 'Sam Brown', course: 'Physics 103' },
  ];

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return 'Good Morning';
    if (currentHour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const lecturerName = 'John';

  return (
    <div className="bg-customGray min-h-screen py-4 px-8">
      {/* Greeting Section */}

      {/* Main Content */}
      <div className=" text-customGreen text-lg md:text-xl font-semibold">
        {getGreeting()}, {lecturerName}!
      </div>
      <div className="flex justify-center pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl">
          {/* Card 1: Display Students */}
          <Link
            to="/lecturer/displayStudent"
            className="bg-white shadow-md rounded-lg p-4  hover:shadow-lg hover:scale-105 transition-all duration-300 h-28 w-56 mx-auto"
          >
            <h2 className="text-customGreen text-lg font-semibold mb-2">Display Student</h2>
            <p className="text-gray-600 mb-4 text-sm">Click view the list of students.</p>
          </Link>

          {/* Card 2: Generate Token */}
          <Link
            to="/lecturer/generateToken"
            className="bg-white shadow-md rounded-lg p-4  hover:shadow-lg hover:scale-105 transition-all duration-300 h-28 w-56 mx-auto"
          >
            <h2 className="text-customGreen text-lg font-semibold mb-2">Generate Token</h2>
            <p className="text-gray-600 mb-4 text-sm">Generate a token for attendance verification.</p>
          </Link>

          {/* Card 3: View Students */}
          <div className="bg-white shadow-md rounded-lg p-4  hover:shadow-lg hover:scale-105 transition-all duration-300 min-h-28 w-56 mx-auto">
            <h2 className="text-customGreen text-lg font-semibold mb-2">Students Registered</h2>
            <p className="text-gray-600 mb-4 text-sm">List of available students</p>
            <div className="bg-customGray text-center p-2 rounded-lg">
                {dummyStudentData.length}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
