const express = require("express");
require('./db/config');
const User = require("./db/User");
const History = require("./db/History");
var cors = require('cors');
require('dotenv').config();


const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
    // Check if email already exists
    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        res.send("Email already exists");
    } else {
        // Create new user
        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password;
        res.send(result);
    }
});


app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            // Check if password is correct
            if (req.body.password === user.password) {
                res.send(user)
            } else {
                res.send({ error: "Enter Valid Password" });
            }
        } else {
            res.send({ error: "User not found" });
        }
    } else {
        res.send({ error: "Please enter email and password" });
    }
});


app.post('/textify/api/generate', async (req, res) => {

    const prompt = req.body.prompt;
 
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 750,
        temperature: 0,
      });
      res.json(response.data);
});


app.post('/imaginex/api/generate', async (req, res) => {

    const prompt = req.body.prompt;
 
    const response = await openai.createImage({
        prompt: prompt,
        n: 4,
        size: "256x256",
      });
      res.json(response.data);
});



app.post("/history", async (req, res) => {
    let history = new History(req.body);
    let result = await history.save();
    res.send(result);
})

app.get("/history/:id", async (req, res) => {
    const userId = req.params.id;
    let history = await History.find({ userId: userId });
    if (history.length > 0) {
        res.send(history);
    } else {
        res.send({ message: "No History Found" });
    }
})




module.exports = app
// app.listen(8000);
