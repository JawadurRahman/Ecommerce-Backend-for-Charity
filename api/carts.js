const express = require("express");
const router = express.Router();
const Cart = require("../models/cart"); // Import your Cart model

// Create a new cart for a session
router.post("/carts", async (req, res) => {
  try {
    const { sessionId } = req.body;

    const cart = new Cart({ sessionId });
    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get the cart for a specific session
router.get("/carts/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;

    const cart = await Cart.findOne({sessionId});

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update the cart for a specific session
router.put("/carts", async (req, res) => {
  try {
    const { sessionId, items } = req.body;

    const updatedCart = { sessionId, items };
    const cart = await Cart.findOneAndUpdate({sessionId}, updatedCart, { new: true });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add item to cart
router.put("/add", async (req, res) => {
  try {
    const { sessionId, item } = req.body;
    const cart = await Cart.findOne({sessionId});

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    const x = cart.items.find((i) => {
      console.log("i", i.product)
      console.log("item", item.product)
      // console.log("y", y)
      const sameItem = i.product == item.product;
      console.log(sameItem)
      // if(sameItem) {
      //   i.quantity += 1;
      // } else {
      //   cart.items.push(item)
      // }
      return i.product == item.product}) //? console.log(cart.items): cart.items.push(item);//.push(item);
    // console.log(x? "a": "b")

    if(!x) {
      cart.items.push(item)
    }


    const items = cart.items;
    const updatedCart = { sessionId, items };
    const newCart = await Cart.findOneAndUpdate({sessionId}, updatedCart, { new: true });

    if (!newCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete the cart for a specific session
router.delete("/carts", async (req, res) => {
  try {
    const { sessionId } = req.body;

    const cart = await Cart.findOneAndDelete({sessionId});

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
