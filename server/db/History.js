const mongoose = require('mongoose');

// const historySchema = new mongoose.Schema({
//     userId:String,
//     userInput:String,
//     aiOutput:String,
//     date: {
//         type: Date, default: Date.now,
//     }
// });

const historySchema = new mongoose.Schema({
    userId: String,
    app: String,
    userInput: String,
    aiOutput: mongoose.Schema.Types.Mixed,
    date: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model("history",historySchema);
