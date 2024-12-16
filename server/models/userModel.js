const mongoose = require("mongoose")


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

    },
    {
        timestamps: true,
    }
)

const User = mongoose.model("User", UserSchema)

module.exports = User