/**
 * - Purpose: This module establishes a connection to MongoDB using Mongoose.
 * - Author(s) / Work Done:
 *   Jawadur Rahman          wrote everything
 */

// Require the mongoose module
const mongoose = require("mongoose");

// Database connection URL
const dbURL = process.env.MONGO_DB_URL || "mongodb://localhost:27017";

// Set up Mongoose connection
mongoose.connect(dbURL);

// Get the default connection
const db = mongoose.connection;

// In case of error
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

// Connection success
db.once("open", () => {
  console.log("Connected to MongoDB!");
});

module.exports = mongoose;
