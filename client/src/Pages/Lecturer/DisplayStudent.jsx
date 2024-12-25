import React, { useEffect, useState } from "react";
import { AddStudentModal } from "../../Components/Modal/AddStudentModal";
import { DeleteModal } from "../../Components/Modal/DeleteModal";
import { UpdateStudentModal } from "../../Components/Modal/UpdateStudentModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Head } from '../../Components/Head';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { toast } from "react-hot-toast";
import { ViewModal } from "../../Components/Modal/ViewModal";

export const DisplayStudent = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false)
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all students from the API
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/lecturer/displayStudent");
      const modifiedStudents = response.data.map((student, index) => ({
        ...student,
        customId: index + 1, // Generate a custom ID for display
      }));
      setStudents(modifiedStudents);
      setFilteredStudents(modifiedStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Error fetching students. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and refetch on modal close
  useEffect(() => {
    fetchStudents();
  }, []);

  // Add student button click
  const handleAddBtn = () => setShowModal(true);

  // Update student button click
  const handleUpdateBtn = (student) => {
    setSelectedStudent(student);
    setShowUpdateModal(true);
  };

  const handleDeleteModal = (student) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };
  const handleViewModal = (student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  // Close modals and refresh data
  const handleCloseModal = () => {
    setShowModal(false);
    setShowUpdateModal(false);
    setShowDeleteModal(false);
    setShowViewModal(false)
    fetchStudents(); // Refresh data after changes
  };

  // Delete student with confirmation
  const handleDeleteBtn = async (id) => {
    try {
      // Fetch the user data first to check the role
      const { data: userData } = await axios.get(`/api/lecturer/displayStudentById/${id}`);
      
      // Check if the role is Lecturer
      if (userData.role === "Lecturer") {
        toast.error("You cannot delete yourself!");
        return; // Exit the function if the user is a Lecturer
      }
      
      // Proceed with deletion if the role is not Lecturer
      const { data: deleteResponse } = await axios.delete(`/api/lecturer/deleteStudent/${id}`);
      
      // Update state to remove the deleted student
      setStudents((prev) => prev.filter((student) => student._id !== id));
      setFilteredStudents((prev) => prev.filter((student) => student._id !== id));
      setShowDeleteModal(false);
  
      // Show success message
      toast.success(deleteResponse.message);
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Error deleting student. Please try again.");
    }
  };

  

  // Search and filter students
  const handleSearchFilter = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredStudents(
      students.filter((student) => student.name.toLowerCase().includes(value))
    );
  };

  const columns = [
    {
      name: "#",
      selector: (row) => row.customId,
      sortable: true,
    },
    {
      name: "Full Name",
      selector: (row) => row.fullname,
      sortable: true,
    },
    {
      name: "Reg Number",
      selector: (row) => row.regnum,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="actBtn">
          <button onClick={() => handleUpdateBtn(row)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={() => handleDeleteModal(row)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
          {/* <button onClick={() => handleViewModal(row)}>
            <FontAwesomeIcon icon={faEye} />
          </button> */}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-customGray py-4 min-h-screen head">
      <div className="px-6 bg-customGray">
  <div className="mt-8 ">
    <Head
      Click={handleAddBtn}
      Title="Students"
      btnName="Student"
      Input={handleSearchFilter}
      val={search}
    />
    <div className="bg-white p-0 px-5 pb-2.5 shadow-md rounded-b-lg w-full">
      <DataTable
        columns={columns}
        data={filteredStudents.length ? filteredStudents : students}
        pagination
        highlightOnHover
        fixedHeader
        fixedHeaderScrollHeight="500px"
        progressPending={loading}
      />
    </div>
  </div>
  <div className="h-96"></div>
</div>

      {/* modals */}
      {showModal && <AddStudentModal onClose={handleCloseModal} />}
      {showUpdateModal && (
        <UpdateStudentModal
          student={selectedStudent}
          onClose={handleCloseModal}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          onClose={handleCloseModal}
          onDelete={(row) => handleDeleteBtn(selectedStudent._id)}
        />
      )}
      {showViewModal && (
        <ViewModal
          onClose={handleCloseModal}
          student={selectedStudent}
        />
      )}
    </div>
  );
};
