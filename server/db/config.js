require('dotenv').config();

const mongoose = require('mongoose');
// mongoose.connect("mongodb://127.0.0.1:27017/ownGPT");
// mongoose.connect(process.env.MONGOURI);

mongoose.connect("mongodb+srv://ronilcoder999:wfO4LmraAjvrqDMG@owngpt.wx89abe.mongodb.net/?retryWrites=true&w=majority");
