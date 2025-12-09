const express = require("express");
const router = express.Router();
const sneaksService = require("../react-frontend/src/services/sneaksService");

// 1️⃣ SEARCH ROUTE (FIRST)
router.get("/search/:query", async (req, res) => {
  try {
    const products = await sneaksService.searchShoes(req.params.query);
    res.json(products);
  } catch (err) {
    console.error("Sneaks Search Error:", err);
    res.status(500).json({ error: "Failed to fetch sneakers" });
  }
});

// 2️⃣ POPULAR ROUTE (SECOND)
router.get("/popular/list", async (req, res) => {
  try {
    const data = await sneaksService.getMostPopular(10);
    res.json(data);
  } catch (err) {
    console.error("Popular Sneakers Error:", err);
    res.status(500).json({ error: "Failed to fetch most popular shoes" });
  }
});

// 3️⃣ PRODUCT PRICES ROUTE (LAST!)
router.get("/:styleID", async (req, res) => {
  try {
    const product = await sneaksService.getProductPrices(req.params.styleID);
    res.json(product);
  } catch (err) {
    console.error("Sneaks Price Error:", err);
    res.status(500).json({ error: "Failed to fetch sneaker price info" });
  }
});

module.exports = router;
