import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export const ViewModal = ({ student, onClose }) => {

  useEffect(()=>{
      // const handleViewBtn = ()=>{
        try {
          const response = axios.get(`/api/lecturer/displayStudentById/${student._id}`)
          setView(response.data)
          console.log(response.data)
        } catch (error) {
          
        }
      // }
  })

  return (
    <div className={`fixed p-3 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-customGreen text-xl font-bold mb-2 text-center">View Student</h2>

        <div className="mb-2">
          <label className="block text-gray-700 font-bold" htmlFor="fullname">
            Full Name:
          </label>
          <p className="text-gray-900">{student.fullname}</p>
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 font-bold" htmlFor="regNumber">
            Registration Number:
          </label>
          <p className="text-gray-900">{student.regnum}</p>
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 font-bold" htmlFor="email">
            Email:
          </label>
          <p className="text-gray-900">{student.email}</p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 mt-7 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-customOrange"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
