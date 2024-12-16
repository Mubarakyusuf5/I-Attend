const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true, expires: '24h' },
    isUsed: {type: Boolean, default: false},
    // attendanceTaken: { type: mongoose.Schema.Types.ObjectId, ref: "Attendance" }
});

module.exports = mongoose.model('Token', tokenSchema);
