const express = require("express");
const router = express.Router();
const Order = require("../models/order");

/**
 * WE DO NOT USE THIS AS OF RIGHT NOW.
 */

// Create a new order
router.post("/orders", async (req, res) => {
  try {
    const { userId, products, amount, address, status } = req.body;
    const order = new Order({ userId, products, amount, address, status });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a specific order by ID
router.get("/orders/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an order by ID
router.put("/orders/:orderId", async (req, res) => {
  try {
    const { userId, products, amount, address, status } = req.body;
    const updatedOrder = { userId, products, amount, address, status };
    const order = await Order.findByIdAndUpdate(req.params.orderId, updatedOrder, { new: true });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an order by ID
router.delete("/orders/:orderId", async (req, res) => {
  try {
    const order = await Order.findByIdAndRemove(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
