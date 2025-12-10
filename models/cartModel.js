
"use strict";
const pool = require('./db');

async function getCartByUser(userId) {
  const result = await pool.query(
    'SELECT ci.*, s.name, s.price, s.image_url FROM cart_items ci JOIN shoes s ON ci.shoe_id = s.product_id WHERE ci.user_id = $1',
    [userId]
  );
  return result.rows;
}

async function addToCart(userId, shoeId, quantity = 1) {
  const result = await pool.query(
    `INSERT INTO cart_items (user_id, shoe_id, quantity) 
     VALUES ($1, $2, $3) 
     ON CONFLICT (user_id, shoe_id) DO UPDATE SET quantity = cart_items.quantity + $3 
     RETURNING *`,
    [userId, shoeId, quantity]
  );
  return result.rows[0];
}

async function removeFromCart(id) {
  const result = await pool.query('DELETE FROM cart_items WHERE id = $1', [id]);
  return result.rowCount;
}

module.exports = { getCartByUser, addToCart, removeFromCart };
