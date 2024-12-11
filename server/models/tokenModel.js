const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model('Token', tokenSchema);
