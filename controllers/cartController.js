// controllers/cartController.js
const pool = require('../db'); // your Postgres pool

async function addItem(req, res) {
  try {
    if (!req.session.user) return res.status(401).json({ message: "Not logged in" });

    const { productId, selectedSize, selectedGender, quantity } = req.body;
    if (!productId || !selectedSize || !selectedGender || !quantity)
      return res.status(400).json({ message: "Missing fields" });

    const userId = req.session.user.id;

    // Check if item already exists
    const existing = await pool.query(
      `SELECT * FROM cart WHERE user_id=$1 AND product_id=$2 AND size=$3 AND gender=$4`,
      [userId, productId, selectedSize, selectedGender]
    );

    if (existing.rows.length > 0) {
      const newQty = existing.rows[0].quantity + quantity;
      await pool.query(`UPDATE cart SET quantity=$1 WHERE id=$2`, [newQty, existing.rows[0].id]);
      return res.json({ success: true, message: "Cart updated", item: { ...existing.rows[0], quantity: newQty } });
    }

    const result = await pool.query(
      `INSERT INTO cart (user_id, product_id, size, gender, quantity)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [userId, productId, selectedSize, selectedGender, quantity]
    );

    res.json({ success: true, message: "Item added to cart", item: result.rows[0] });
  } catch (err) {
    console.error("CART ADD ERROR:", err);
    res.status(500).json({ message: "Server error adding item" });
  }
}

async function fetchCart(req, res) {
  try {
    if (!req.session.user) return res.status(401).json({ message: "Not logged in" });
    const userId = req.session.user.id;

    const result = await pool.query(
      `SELECT cart.id AS cart_id, product_id, size, gender, quantity, p.name, p.price, p.image_url
       FROM cart
       JOIN products p ON cart.product_id = p.id
       WHERE user_id=$1`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("FETCH CART ERROR:", err);
    res.status(500).json({ message: "Server error fetching cart" });
  }
}

async function removeItem(req, res) {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM cart WHERE id=$1`, [id]);
    res.json({ success: true, message: "Item removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error removing item" });
  }
}
async function updateItem(req, res) {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const result = await pool.query(
      `UPDATE cart SET quantity=$1 WHERE id=$2 RETURNING *`,
      [quantity, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ success: true, item: result.rows[0] });
  } catch (err) {
    console.error("UPDATE ITEM ERROR:", err);
    res.status(500).json({ message: "Server error updating item" });
  }
}


module.exports = { addItem, fetchCart, removeItem, updateItem };
