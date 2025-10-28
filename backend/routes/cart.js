const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// Add/update cart
router.post("/", async (req,res) => {
  const { userId, products } = req.body;
  try{
    let cart = await Cart.findOne({ userId });
    if(cart){
      cart.products = products; // update
    }else{
      cart = new Cart({ userId, products });
    }
    await cart.save();
    res.json(cart);
  }catch(err){
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user cart
router.get("/:userId", async (req,res) => {
  try{
    const cart = await Cart.findOne({ userId: req.params.userId });
    if(!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  }catch(err){
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
