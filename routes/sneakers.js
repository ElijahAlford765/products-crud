import express from "express";
import * as sneaksService from "../services/sneaksService.js";

const router = express.Router();

// Search sneakers
router.get("/search/:query", async (req, res) => {
  try {
    const products = await sneaksService.searchShoes(req.params.query);
    res.json(products);
  } catch (err) {
    console.error("Sneaks API error:", err);
    res.status(500).json({ error: "Sneaks API error" });
  }
});

// Get sneaker details/prices by style ID
router.get("/item/:styleID", async (req, res) => {
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

export default router;
