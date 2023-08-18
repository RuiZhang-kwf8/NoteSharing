// Importing required modules
const express = require('express');
const dotenv = require("dotenv").config();
const connectDb = require("./confix/dbConnection");
require('dotenv').config();
const User = require("./models/usermodels");
//cookie parser 
const cookieParser = require('cookie-parser');
//body 
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const Notes = require('./models/notemodels'); // Your User model
const Page = require('./models/pagemodels'); // Your User model



// Create an instance of Express
const app = express();
// use cookie parser 
app.use(cookieParser());
//body 
app.use(bodyParser.urlencoded({ extended: true }));
//use views
app.use(express.static('public'));
//auth control 
const {createTokens, validateToken} = require('./server/controller/authorizationcontrols');

//connect DB 
connectDb(); 
// Set the view engine to EJS
app.set('view engine', 'ejs');


//render home 
app.get('/', (req, res) => {
    res.render('home');
});

//setvars 
let accessToken = '';
let currentnote = '';
let curid = ''; 

//get quotes we first validate token then we load all notes 
app.get("/quotes", validateToken, async (req, res) => {
  const notes = await Notes.find();
  res.render('notes', { notes: notes});
}); 

//newsletter 
app.get( "/newsletter", (req, res) => {
    res.render('newsletter'); 
});


//updated home 

app.get("/homed", (req, res) => {
  res.render('homed');
});

// post all pages  
app.get("/postfirst/:text", async (req, res) => {
  currentnote = req.params.text;
  const pages = await Page.find({id: currentnote});
  res.render('individualclass', { pages: pages});
}); 

//WIP

//post page 
app.post('/pagespost/', async (req, res) => {
  const {typeofinfo, description} = req.body;
  const decoded = jwt.verify(accessToken, "jwtsecretplschange");
    const currentUsername = decoded.username;
  const currentnote1 = currentnote; 
  const page = await Page.create({
      typeofinfo: typeofinfo,
      description: description,
      id: currentnote1,
     usersid: currentUsername,
    });
    const pages = await Page.find({id: currentnote});
    res.render('individualclass', { pages: pages });
}); 


//delete pages if needed 

//WIP
app.get(`/posts/:usersid/:id/:description`, async (req, res) => {
  const decoded = jwt.verify(accessToken, "jwtsecretplschange");
  const currentUsername = decoded.username;
  if (req.params.usersid == currentUsername && req.params.id == currentnote) {
      await Page.deleteOne({usersid: req.params.usersid, id: req.params.id, description: req.params.description}); // Deleting the note using deleteOne()

  }
  const pages = await Page.find({id: currentnote});
  res.render('individualclass', { pages: pages});
});  




//delete the notes 
  app.get(`/notes/:real_user_id/:text`, async (req, res) => {
      const decoded = jwt.verify(accessToken, "jwtsecretplschange");
      const currentUsername = decoded.username;
      if (req.params.real_user_id == currentUsername) {

          await Notes.deleteOne({text: req.params.text}); // Deleting the note using deleteOne()

      }
      const note = await Notes.find();
      res.render('notes', { notes: note});
  });  


 // post the notes 
 app.post('/notespost', async (req, res) => {
    const {textbody} = req.body;
    const decoded = jwt.verify(accessToken, "jwtsecretplschange");
    const currentUsername = decoded.username;

    const note = await Notes.create({
      user_id: textbody,
        real_user_id: currentUsername,
        text: textbody,
      });
      const notes = await Notes.find();
      res.render('notes', { notes: notes });
  }); 



  
  app.get("/logout", (req, res) => {
  
    res.clearCookie("access-token");

    res.redirect("/");
  });

  // go to register page 
app.get( "/register", (req, res) => {
    res.render('register'); 
});

//create user 
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;  
  // Hash a password 
    
    try {
      const newUser = await User.create({
        username: username,
          email: email,
          password: password,
      });
      res.render("loggedin");
  } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
  }
}
); 


// go to login page
app.get( "/login", (req, res) => {
    res.render('loggedin'); 
});


//handle login 

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({username: username});
  if (!user) res.status(400).json({ error: "User Doesn't Exist" });

  const dbPassword = user.password;
  if (password == dbPassword) {

    accessToken = createTokens(user);

    res.cookie("access-token", accessToken);
    res.render("homed");
  }
  });



// Define a basic route
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});