const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    attendance: [
      {
        date: { type: Date, required: true },
        token: { type: mongoose.Schema.Types.ObjectId, ref: "Token" }
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema)

module.exports = Attendance
