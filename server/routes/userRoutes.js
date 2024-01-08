const express = require("express");
const {
  registerUser,
  loginUser
} = require("../controller/usercontrol");

/*
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      // User is authenticated, proceed to the next middleware/route handler
      return next();
    }
  
    // User is not authenticated, redirect to the login page or an error page
    res.redirect('/login'); // Change 'login' to your actual login route
  }
  */

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;