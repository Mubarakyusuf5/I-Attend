import React from 'react';
import { toast } from 'react-hot-toast';

export const DeleteModal = ({ onClose, onDelete }) => {
//   const handleDelete = () => {
//     toast.success(`deleted successfully!`);
//     onConfirm(); // Execute the confirm action
//     onClose(); // Close the modal after deletion
//   };

  return (
    <div className="fixed inset-0 bg-black p-4 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
        <h2 className="text-red-600 text-xl font-bold mb-4 text-center">Delete Confirmation</h2>
        <p className="text-gray-700 mb-6 text-center">
          Are you sure you want to delete this data?<br/>
          <b>This action cannot be undone.</b>
        </p>

        <div className="flex justify-between mt-1">
          <button
            onClick={onDelete}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Delete
          </button>

          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};


