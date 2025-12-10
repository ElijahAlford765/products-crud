const express = require("express");
const router = express.Router();
const pool = require("../db"); 


router.get("/", async (req, res) => {
  try {
    if (!req.session.user) return res.status(401).json({ message: "Not logged in" });
    const userId = req.session.user.id;
    const result = await pool.query(
      `SELECT * FROM wishlist w
       JOIN products p ON w.product_id = p.id
       WHERE user_id = $1`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching wishlist" });
  }
});


router.post("/", async (req, res) => {
  try {
    if (!req.session.user) return res.status(401).json({ message: "Not logged in" });
    const userId = req.session.user.id;
    const { productId } = req.body;

   
    const exists = await pool.query(
      `SELECT * FROM wishlist WHERE user_id=$1 AND product_id=$2`,
      [userId, productId]
    );
    if (exists.rows.length > 0)
      return res.status(400).json({ message: "Already in wishlist" });

    const result = await pool.query(
      `INSERT INTO wishlist (user_id, product_id) VALUES ($1, $2) RETURNING *`,
      [userId, productId]
    );
    res.json({ success: true, item: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error adding to wishlist" });
  }
});

module.exports = router;
