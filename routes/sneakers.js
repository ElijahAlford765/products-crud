"use strict";

const express = require("express");
const router = express.Router();
const pool = require("../db"); // Neon DB connection

// Search sneakers by name
router.get("/search/:query", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE name ILIKE $1",
      [`%${req.params.query}%`]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Get sneaker prices/details by styleID
router.get("/product/:styleID", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE id=$1",
      [req.params.styleID]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Get most popular sneakers
router.get("/popular/list", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY popularity DESC LIMIT 10"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
