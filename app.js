const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const userModel = require('./models/user');

const mongoURI = "mongodb://localhost:27017/infoDB";

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("Database Connection Error:", err));

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Home Page
app.get('/', (req , res) => {
  res.render("index");
});

// Read Page
app.get('/read', async (req, res) => {
  
    let users = await userModel.find();
    res.render("read", {users});
  })

// Create User
app.post('/create', async (req, res) =>{
    let {name, email, image} = req.body;

   let createduser = await userModel.create({
        name,
        email,
        image,

    })
    res.render("read", {users: [createduser]});
})
// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err);
  res.status(500).send("Something went wrong");
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
