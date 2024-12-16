import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

export const LecturerPage = () => {
  const [student, setStudent] = useState(0)
  const { user } = useAuth()

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return 'Good Morning';
    if (currentHour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const firstName = user.fullname.split(" ")[0];


  const fetchStudents = async () => {
    try {
      const response = await axios.get("/api/lecturer/displayStudent");
      
      // Filter the students based on role
      const students = response.data.filter(user => user.role === "Student");
  
      // Set the filtered students
      setStudent(students);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };
  

  useEffect(()=>{
    fetchStudents()
  },[])

  return (
    <div className="bg-customGray min-h-screen py-4 px-8">
      {/* Greeting Section */}

      {/* Main Content */}
      <div className=" text-customGreen text-lg md:text-xl font-semibold">
        {getGreeting()}, {firstName || "Guest"}!
      </div>
      <div className="flex justify-center pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl">
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
          <Link
            to="/lecturer/attendance"
            className="bg-white shadow-md rounded-lg p-4  hover:shadow-lg hover:scale-105 transition-all duration-300 h-28 w-56 mx-auto"
          >
            <h2 className="text-customGreen text-lg font-semibold mb-2">View Attendance</h2>
            <p className="text-gray-600 mb-4 text-sm">Verify the attendance taken.</p>
          </Link>

          {/* Card 4: View Students */}
          <div className="bg-white flex items-center gap-2 shadow-md rounded-lg p-4  hover:shadow-lg hover:scale-105 transition-all duration-300 min-h-28 w-56 mx-auto">
            <div>
            <h2 className="text-customGreen text-lg font-semibold mb-2">Students Registered</h2>
            <p className="text-gray-600 mb-4 text-sm">List of available students</p>
            </div>
            <div className="bg-customGreen text-white text-lg font-semibold text-center p-2 rounded-lg">
                {student.length}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
