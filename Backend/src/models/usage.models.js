const mongoose = require("mongoose");
const usageSchema = new mongoose.Schema({
    identifier: {
        type: String,  // ip address or userId
        required: true
    },
    usage: {
        type: Number,
        default: 0,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model("Usage", usageSchema);