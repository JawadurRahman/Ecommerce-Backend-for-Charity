const User = require("../models/user");
const router = require("express").Router();
// const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {
  authenticationVerifier,
  accessLevelVerifier,
  isAdminVerifier,
} = require("../middlewares/isAuthenticated");

// Get a list of all users
router.get("/", isAdminVerifier, async (req, res) => {
  
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// User Registration
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isAdmin = username.includes("admin") ? true: false;
    const newUser = new User({ username, email, password, isAdmin });
    const savedUser = await newUser.save();
    // res.status(201).json(savedUser);
    res.redirect('/login.html');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// User Login
router.post("/login", async (req, res) => {
  console.log("TEST LOGIN")
  console.log(req.body)
  
  try {
    //const { email, password } = req.body;
    const email = req.body.email;
    const reqPassword = req.body.password;
    console.log(email, reqPassword)
    const user = await User.findOne({ email });
    if (!user || user.password !== reqPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // Implement bcrypt
    // If the password is valid, generate and send a token for authentication.
    const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.TOKEN, {
      expiresIn: "1d",
    });

    const { password, ...data } = user._doc;

    res.cookie('authToken', accessToken);

    res.status(200).json({
      type: "success",
      message: "Successfully logged",
      ...data,
      accessToken,
    });

    //res.json({ message: "Login successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add more routes for managing user accounts, updates, password resets, etc., as needed.

module.exports = router;
