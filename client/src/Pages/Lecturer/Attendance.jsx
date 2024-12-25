import React, { useEffect, useState } from "react";
import { Head } from '../../Components/Head';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import "./style.css"

export const Attendance = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
  
    // Fetch all students from the API
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/lecturer/displayAttendance");
        const modifiedStudents = response.data.map((student, index) => ({
          ...student,
          customId: index + 1, // Generate a custom ID for display
        }));
        setStudents(modifiedStudents);
        setFilteredStudents(modifiedStudents);
      } catch (error) {
        // console.log("Error fetching student attendance:", error);
        toast.error(error.response.data.message || "Error fetching student attendance. Please try again.")
        // toast.error("Error fetching student attendance. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
        fetchStudents();
      }, []);

    const handleSearchFilter = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);
        setFilteredStudents(
          students.filter((student) => student.name.toLowerCase().includes(value))
        );
      };

      const navigate = useNavigate()
      const nextPage =()=>{
        navigate("/lecturer/attendance/today")
      }

    
      const columns = [
        {
          name: "S/N",
          selector: (row) => row.customId,
          sortable: true,
        },
        {
          name: "Full Name",
          selector: (row) => row.student.fullname,
          sortable: true,
        },
        {
          name: "Reg Number",
          selector: (row) => row.student.regnum,
          sortable: true,
        },
        {
          name: "Time's Present",
          selector: (row) => row.attendance.length,
          sortable: true,
        },
        // {
        //   name: "Action",
        //   selector: (row) => row.attendan,
        //   sortable: true,
        // },
        
      ];

  return (
    <div className="page bg-customGray py-4 min-h-screen">
      <div className="px-6 bg-customGray">
        <div className="body mt-8 ">
          <Head
            Click1={nextPage}
            Title="Attendance"
            btnName1="Filter Today's Attendance"
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
      </div>
    </div>
  );
};
