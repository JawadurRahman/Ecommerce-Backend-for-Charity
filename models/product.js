/**
 * - Purpose: Defines the Mongoose schema and model for the "product" collection in the MongoDB database.
 * - Author(s) / Work Done:
 *   Jawadur Rahman           wrote everything
 */

// Require the MongoDB connection
const db = require("../db");

// Define the schema for the "product" collection
const productSchema = new db.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrls: { type: String, required: true },
  stockQuantity: { type: Number, required: true },
  priceId: { type: String, required: true }
});

// Create a Mongoose model for the "product" collection
const product = db.model("product", productSchema);

// Export the Product model for use in other modules
module.exports = product;
