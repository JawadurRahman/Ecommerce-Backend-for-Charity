/**
 * - Purpose: This file configures an Express web server for handling API routes and serving static files.
 * - Author(s) / Work Done:
 *   Jawadur Rahman           wrote everything
 */
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
require("dotenv").config();
const port = process.env.PORT || 3000;
const path = require("path");
const db = require("./db");

const {
  authenticationVerifier,
  accessLevelVerifier,
  isAdminVerifier,
} = require("./middlewares/isAuthenticated");

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({extended:false}));

// Use the cookie-parser middleware to handle cookies
app.use(cookieParser()); 

// Serve static files from the public dir
app.use(express.static("public"));

// Serve static files from the private dir. Protected by isAdminVerifier middleware.
app.use('/private', isAdminVerifier, express.static('private'));

// Serve APIs
app.use("/api/products", require("./api/products"));
app.use("/api/users", require("./api/users"));
app.use("/api/carts", require("./api/carts"));
app.use("/api/orders", require("./api/orders"));
app.use("/", require("./api/payment"));

// Start the web server
app.listen(port, function () {
  console.log(`Listening on port ${port}...`);
});

// Create an endpoint to generate and return a unique ID
app.get('/generateUniqueId', async (req, res) => {
  try {
    // Create a new unique ID
    const newObjectId = new db.Types.ObjectId()

    // Send the generated ID as a response
    res.json({ id: newObjectId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
