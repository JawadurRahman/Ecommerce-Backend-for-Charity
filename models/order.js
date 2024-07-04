/**
 * - Purpose: Defines the Mongoose schema and model for the "Order" collection in the MongoDB database.
 * - Author(s) / Work Done:
 *   Jawadur Rahman           wrote everything
 */

// Require the MongoDB connection
const db = require("../db");

// Define the schema for the "Order" collection
const OrderSchema = new db.Schema({
  userId: { type: String, required: true },
  products: [{ productId: { type: String }, quantity: { type: Number, default: 1 } }],
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "pending" },
});

// Create a Mongoose model for the "Order" collection
const Order = db.model("Order", OrderSchema);

// Export the Order model for use in other modules
module.exports = Order;
