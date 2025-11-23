"use strict";
const pool = require('./db');

async function getWishlistByUser(userId) {
  const result = await pool.query(
    `SELECT w.*, s.name, s.price, s.image_url 
     FROM wishlist w 
     JOIN shoes s ON w.shoe_id = s.product_id 
     WHERE w.user_id = $1`,
    [userId]
  );
  return result.rows;
}

async function addToWishlist(userId, shoeId) {
  const result = await pool.query(
    `INSERT INTO wishlist (user_id, shoe_id) 
     VALUES ($1, $2)
     ON CONFLICT (user_id, shoe_id) DO NOTHING
     RETURNING *`,
    [userId, shoeId]
  );
  return result.rows[0];
}

async function removeFromWishlist(userId, shoeId) {
  const result = await pool.query(
    `DELETE FROM wishlist 
     WHERE user_id = $1 AND shoe_id = $2`,
    [userId, shoeId]
  );
  return result.rowCount;
}

module.exports = { getWishlistByUser, addToWishlist, removeFromWishlist };
