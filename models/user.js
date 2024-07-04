/**
 * - Purpose: Defines the Mongoose schema and model for the "user" collection in the MongoDB database.
 * - Author(s) / Work Done:
 *   Jawadur Rahman           wrote everything
 */

// Require the MongoDB connection 
const db = require("../db");

// Define the schema for the "user" collection
const userSchema = new db.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

// Create a Mongoose model for the "user" collection
const User = db.model("user", userSchema);

// Export the User model for use in other modules
module.exports = User;
