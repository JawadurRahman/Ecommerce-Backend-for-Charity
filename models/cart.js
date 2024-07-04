/**
 * - Purpose: Defines the Mongoose schemas and model for the "Cart" collection in the MongoDB database.
 * - Author(s) / Work Done:
 *   Jawadur Rahman           wrote everything
 */

// Require the MongoDB connection 
const db = require("../db");

// Define the schema for a cart item
const cartItemSchema = new db.Schema({
  product: {
    type: db.Schema.Types.ObjectId,
    ref: "Product", // Reference to the Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1, // Default quantity is 1
  },
});

// Define the schema for the "Cart" collection
const cartSchema = new db.Schema({
  sessionId: { type: String, required: true, unique: true },
  items: [cartItemSchema], // Array of cart items
});

// Create a Mongoose model for the "Cart" collection
const Cart = db.model("cart", cartSchema);

// Export the Cart model for use in other modules
module.exports = Cart;
