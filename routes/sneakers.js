"use strict";

const express = require("express");
const router = express.Router();
const SneaksAPI = require("sneaks-api");

const sneaks = new SneaksAPI();

// ----------------------------
//  GET MOST POPULAR sneakers
// ----------------------------
router.get("/popular/list", (req, res) => {
  sneaks.getMostPopular(10, (err, products) => {
    if (err) return res.status(500).json({ error: "Sneaks API error" });
    res.json(products);
  });
});

// ----------------------------
//  SEARCH sneakers
// ----------------------------
router.get("/search/:query", (req, res) => {
  sneaks.getProducts(req.params.query, (err, products) => {
    if (err) return res.status(500).json({ error: "Sneaks API error" });
    res.json(products);
  });
});

// ----------------------------
//  GET PRICE / DETAILS by styleID
// ----------------------------
router.get("/:styleID", (req, res) => {
  sneaks.getProductPrices(req.params.styleID, (err, product) => {
    if (err) return res.status(500).json({ error: "Sneaks API error" });
    res.json(product);
  });
});

module.exports = router;
