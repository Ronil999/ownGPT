const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId:String,
    userInput:String,
    aiOutput:String,
    date: {
        type: Date, default: Date.now,
    }
});

module.exports = mongoose.model("history",historySchema);