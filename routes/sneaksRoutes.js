"use strict";

const express = require("express");
const router = express.Router();
const SneaksAPI = require("sneaks-api");

const sneaks = new SneaksAPI();


router.get("/search/:query", (req, res) => {
  sneaks.getProducts(req.params.query, (err, products) => {
    if (err) return res.status(500).json({ error: "Sneaks API error" });
    res.json(products);
  });
});


router.get("/product/:styleID", (req, res) => {
  sneaks.getProductPrices(req.params.styleID, (err, product) => {
    if (err) return res.status(500).json({ error: "Sneaks API error" });
    res.json(product);
  });
});




router.get("/popular/list", async (req, res) => {
  try {
    const products = await getMostPopular(10); 
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
