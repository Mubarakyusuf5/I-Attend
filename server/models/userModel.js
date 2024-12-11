const mongoose = require("mongoose")

// const attendanceSchema = mongoose.Schema({
//     date: { type: Date, required: true },
//     status: { type: String, enum: ['Present', 'Absent'], default:"null", required: true },
// });

const UserSchema =  mongoose.Schema(
    {
        fullname:{
            type: String,
            required: true
        },
        regnum:{
            type: String,
            required: true,
            unique: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/, 'Please fill a valid email address']
        },
        password:{
            type: String,
            required: true
        },
        role:{
            type: String,
            enum: ['Lecturer', 'Student'],
            default: "Student"
        },
        // attendance: [attendanceSchema]

    },
    {
        timestamps: true,
    }
)

const User = mongoose.model("User", UserSchema)

module.exports = User