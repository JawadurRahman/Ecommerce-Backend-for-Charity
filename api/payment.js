const stripe = require("stripe")(process.env.STRIPE_KEY);
const router = require("express").Router();
const Cart = require("../models/cart");
const Product = require("../models/product");

const YOUR_DOMAIN = process.env.ENVIRONMENT_URL; // see .env file http://ugdev.cs.smu.ca:3000/ or http://localhost:3000

router.get("/create-checkout-session/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // console.log(cart.items);
    // cart.items.forEach((e) => console.log(e));
    let itemsToBuy = await formatItems(cart.items);

    const session = await stripe.checkout.sessions.create({
      line_items: itemsToBuy,
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/success.html`,
      cancel_url: `${YOUR_DOMAIN}/index.html`,
    });

    res.redirect(303, session.url);

    //res.json(cart);
  } catch (error) {
    res.status(400).json({ error: `No items inside cart or ${error.message}` });
  }
});

async function formatItems(items) {
  const productIds = items.map(item => item.product);
  const products = await Product.find({ _id: { $in: productIds } })
  console.log(products)
  let objArray = [];

  for(let i = 0; i < items.length; i++) {
    objArray.push({ price: products[i].priceId, quantity: items[i].quantity })
  }

  console.log("objArray: ", objArray);
  return objArray;
}

module.exports = router;
