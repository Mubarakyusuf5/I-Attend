const Students = require("../models/userModel.js");
const {
  hashPassword,
} = require("../middlewares/hash.js");

const displayStudent = async (req, res) => {
    try {
      const Student = await Students.find({});
      res.status(200).json(Student);
    } catch (error) {
      res.status(500).json({ message: "Error fetching Students" });
    }
  };

  const displayStudentById = async (req, res) => {
    try {
        const Student = await Students.findById(req.params.id);
        res.status(200).json(Student);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Student by ID" });
        console.log(error);
    }
};


  const updateStudent = async (req, res) => {
    try {
      const { fullname, regnum, email, password } = req.body;
  
      // Validate fields
      // if (!fullname || !regnum || !email || !password) {
      //   return res.status(400).json({ message: "All fields are required" });
      // }
  
      // Hash password before updating if it's provided
      const updatedData = { fullname, regnum, email };
      if (password) {
        updatedData.password = await hashPassword(password);
      }
  
      const updatedStudent = await Students.findByIdAndUpdate(req.params.id, updatedData, { new: true });
  
      if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      res.status(200).json({ message: "Student updated successfully", updatedStudent });
    } catch (error) {
      res.status(500).json({ message: "Error updating Student", error });
    }
  };

const deleteStudent = async (req, res)=>{
    try {
        const deletedStudent = await Students.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Student deleted successfully", deletedStudent });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Student", error });
    }
}


  module.exports = {
    displayStudent,
    displayStudentById,
    updateStudent,
    deleteStudent,
  };