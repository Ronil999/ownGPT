const express = require("express");
require('./db/config');
const User = require("./db/User");
const History = require("./db/History");
var cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;


const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const app = express();

app.use(express.json());

const corsOptions = {
    origin: "https://owngpt-4.vercel.app", // Replace with your React app's domain
  };
  
app.use(cors(corsOptions));

app.get("/", async (req,res) => {
    res.send("App is Working");
})

app.post("/register", async (req, res) => {
    // Check if all fields are filled
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400).send("All fields are mandatory");
    } else {
        // Check if email already exists
        let existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            res.status(400).send("Email already exists");
        } else {
            // Hash password
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

            // Create new user
            let user = new User({
                ...req.body,
                password: hashedPassword
            });
            let result = await user.save();
            result = result.toObject();
            delete result.password;
            res.send(result);
        }
    }
});

app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            // Check if password is correct
            const match = await bcrypt.compare(req.body.password, user.password);
            if (match) {
                user = user.toObject();
                delete user.password;
                res.send(user)
            } else {
                res.status(400).send({ error: "Incorrect password" });
            }
        } else {
            res.status(400).send({ error: "User not found" });
        }
    } else {
        res.status(400).send({ error: "Please enter email and password" });
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

app.post('/contact', (req, res) => {
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: 'strangerboy071.999@gmail.com',
            pass: 'veqvypnxztjtrkrz'
        }
    });

    // console.log(req.body);

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"ownGPT Contact 👻" <strangerboy071.999@gmail.com>', // sender address
            to: "ronilcoder999@gmail.com", // list of receivers
            subject: req.body.subject, // Subject line
            // text: "Hello world?", // plain text body
            html: `
            <table>
      <tr>
        <td><b>Name:</b></td>
        <td>${req.body.name}</td>
      </tr>
      <tr>
        <td><b>Email:</b></td>
        <td>${req.body.email}</td>
      </tr>
      <tr>
        <td><b>Phone Number:</b></td>
        <td>${req.body.phone}</td>
      </tr>
      <tr>
        <td><b>Message:</b></td>
        <td>${req.body.message}</td>
      </tr>
    </table>
            `
        });
        console.log("Message sent: %s", info.messageId);
    }
    main().catch(console.error);
    res.json({ success: true, message: "Your Response will Successfully send" });
})

app.listen(8000);
