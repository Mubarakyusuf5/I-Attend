const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema(
  {
    token:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Token",
        required: true
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attendance: [
      {
        date: { type: Date, required: true },
        status: {
          type: String,
          enum: ["Present", "Absent"],
        //   default: "null",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema)

module.exports = Attendance
