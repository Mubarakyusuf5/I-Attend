const Token = require('../models/tokenModel');
const Student = require('../models/userModel');
const Attendance = require("../models/Attendance")

// Generate Tokens
const GenerateToken = async (req, res) => {
    try {
        // Fetch the number of students
        const students = await Student.find();
        const numberOfTokens = students.length + 3;

        if (numberOfTokens === 0) {
            return res.status(400).json({ message: "No students found to generate tokens." });
        }

        // Check if tokens are already generated for today
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to start of the day
        const genToday = await Token.findOne({ date: today });

        if (genToday) {
            return res.status(400).json({ message: "Token already generated for today" });
        }

        // Generate unique tokens
        const tokens = [];
        for (let i = 0; i < numberOfTokens; i++) {
            const uniqueToken = `AUK${Math.random().toString(36).substr(2, 8)}${i + 1}`;
            tokens.push({ token: uniqueToken, date: today });
        }

        // Store tokens in the database
        await Token.insertMany(tokens);

        res.status(201).json({ message: 'Tokens generated successfully', tokens });
    } catch (err) {
        console.error("Error in GenerateToken:", err.message);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

// Display Today's Token
const displayTodaysToken = async (req, res) => {
    try {
        // Define today's range (start and end)
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Find all tokens for today
        const tokens = await Token.find({
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        if (tokens.length === 0) {
            return res.status(404).json({ message: "No tokens generated for today." });
        }

        res.status(200).json(tokens);
    } catch (err) {
        console.error("Error in displayTodaysToken:", err.message);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const markAttendance = async (req, res) => {
  const { studentId, tokenInput } = req.body;

  try {
    // Find the token in the database
    const token = await Token.findOne({ token: tokenInput });
    if (!token) {
      return res.status(400).json({ message: 'Invalid or expired token ' });
    }

    // Check if the token has already been used
    if (token.isUsed) {
      return res.status(400).json({ message: 'Token has already been used' });
    }

    // Validate the student
    const student = await Student.findOne({ _id: studentId, role: 'Student' });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of the day

    const existingAttendance = await Attendance.findOne({
        student: studentId,
        'attendance.date': today,
    });

    if (existingAttendance) {
        return res.status(400).json({ message: 'Attendance has already been taken for today.' });
    }

    // Mark the token as used
    token.isUsed = true;
    await token.save();

    // Update attendance for the student, linking to the token
    const attendanceRecord = await Attendance.findOne({ student: studentId });

    if (attendanceRecord) {
      // Update existing attendance using .create to push attendance
      await Attendance.create({
        student: studentId,
        attendance: [{
          date: token.date,
          status: 'Present',
          token: token._id,  // Add the token reference
        }],
      });
    } else {
      // If no attendance record exists for the student, create one
      await Attendance.create({
        student: studentId,
        attendance: [{
          date: token.date,
          status: 'Present',
          token: token._id,  // Add the token reference
        }],
      });
    }

    res.status(200).json({
      message: 'Attendance marked successfully',
      token: token.token,
      student: {
        fullname: student.fullname,
        regnum: student.regnum,
      },
    });
  } catch (err) {
    console.error("Error in markAttendance:", err.message);
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }
};

const displayAttendance = async (req, res)=>{
  try {
    const attendance = await Attendance.find()
    // .populate({path:"student"})
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Attendance." });
  }
}

const displayTodaysAttendance = async (req, res) => {
  try {
    // Define today's range (start and end)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Normalize to start of the day
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // Normalize to end of the day

    // Find attendance records for today
    const attendance = await Attendance.find({
      'attendance.date': { $gte: startOfDay, $lte: endOfDay },
    }).populate({ path: "student", select: "fullname regnum" });

    if (attendance.length === 0) {
      return res.status(404).json({ message: "No attendance records for today." });
    }

    res.status(200).json(attendance);
  } catch (error) {
    console.error("Error fetching attendance:", error.message);
    res.status(500).json({ message: "Error fetching attendance." });
  }
};



module.exports = {
    GenerateToken,
    displayTodaysToken,
    markAttendance,
    displayAttendance,
    displayTodaysAttendance
};
