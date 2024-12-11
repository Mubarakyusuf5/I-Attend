import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export const UpdateStudentModal = ({ onClose, student }) => {
    const [loading, setLoading] = useState(false);
    const [cPassword, setCPassword] = useState("")
  const [formData, setFormData] = useState({
    fullname: student?.fullname || "",
    regNumber: student?.regNumber || '',
    email: student?.email || "",
    // role: student?.role || "",
    password: student?.password || "",
  });

  const handleChange =  (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullname, regNumber, email, password} = formData;

    // Simple validation
    if (!fullname || !regNumber || !email || !password) {
      toast.error('All fields are required!');
      return;
    }

    if (password !== cPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
        const response = await axios.put(`/api/lecturer/updateUser/${student._id}`, formData);
        toast.success(response.data.message);
        onClose();
      } catch (error) {
        console.error("Error updating user:", error);
        const errorMessage = error.response?.data?.message || "Error updating user. Please try again.";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="fixed p-3 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-customGreen text-xl font-bold mb-2 text-center">Update Student</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-gray-700 mb-1" htmlFor="fullname">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-customGreen"
              placeholder="Enter full name"
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 mb-1" htmlFor="regNumber">
              Registration Number
            </label>
            <input
              type="text"
              id="regNumber"
              name="regNumber"
              value={formData.regNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-customGreen"
              placeholder="Enter registration number"
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-customGreen"
              placeholder="Enter email"
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-customGreen"
              placeholder="Enter password"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={cPassword}
              onChange={e => setCPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-customGreen"
              placeholder="Confirm password"
            />
          </div>

        <div className='flex justify-between'>
            <button
                type="submit"
                disabled={loading}
                className=" bg-customGreen text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-customOrange"
            >
                Update Student
            </button>

            <button
            className=' bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-customOrange'
            onClick={onClose}
            >
                Cancel
            </button>

        </div>
        </form>
      </div>
    </div>
  );
};
