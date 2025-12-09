"use strict";

const express = require("express");
const router = express.Router();
const SneaksAPI = require("sneaks-api");

const sneaks = new SneaksAPI();

//  Search sneakers
router.get("/search/:query", (req, res) => {
  sneaks.getProducts(req.params.query, (err, products) => {
    if (err) return res.status(500).json({ error: "Sneaks API error" });
    res.json(products);
  });
});

//  Get sneaker prices/details by styleID
router.get("/product/:styleID", (req, res) => {
  sneaks.getProductPrices(req.params.styleID, (err, product) => {
    if (err) return res.status(500).json({ error: "Sneaks API error" });
    res.json(product);
  });
});

//  Get most popular sneakers
router.get("/popular/list", (req, res) => {
  sneaks.getMostPopular(10, (err, products) => {
    if (err) return res.status(500).json({ error: "Sneaks API error" });
    res.json(products);
  });
});

module.exports = router;
