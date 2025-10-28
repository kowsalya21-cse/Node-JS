const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");

// Middleware to protect routes
const protect = (req,res,next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({ message: "Unauthorized" });
  const token = authHeader.split(" ")[1];
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }catch(err){
    return res.status(401).json({ message: "Token invalid" });
  }
}

// Add product (protected)
router.post("/", protect, async (req,res) => {
  try{
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  }catch(err){
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all products
router.get("/", async (req,res) => {
  try{
    const products = await Product.find();
    res.json(products);
  }catch(err){
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get single product
router.get("/:id", async (req,res) => {
  try{
    const product = await Product.findById(req.params.id);
    if(!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  }catch(err){
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
