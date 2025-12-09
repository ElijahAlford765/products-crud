const express = require("express");
const router = express.Router();
const sneaksService = require("../services/sneaksService");

// Search sneakers
router.get("/search/:query", async (req, res) => {
  try {
    const products = await SneaksService.searchShoes(req.params.query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Sneaks API error" });
  }
});

// Get sneaker prices/details by styleID
router.get("/:styleID", async (req, res) => {
  try {
    const product = await sneaksService.getProductPrices(req.params.styleID);
    res.json(product);
  } catch (err) {
    console.error("Sneaks API error:", err);
    res.status(500).json({ error: "Sneaks API error" });
  }
});

// Get most popular sneakers
router.get("/popular/list", async (req, res) => {
  try {
    const popular = await sneaksService.getMostPopular(10);
    res.json(popular);
  } catch (err) {
    console.error("Sneaks API error:", err);
    res.status(500).json({ error: "Sneaks API error" });
  }
});

module.exports = router;
