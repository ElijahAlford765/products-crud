"use strict";
const pool = require('./db');

async function getReviewsByShoe(shoeId) {
  const result = await pool.query(
    `SELECT r.*, u.username 
     FROM reviews r 
     JOIN users u ON r.user_id = u.id 
     WHERE r.shoe_id = $1`,
    [shoeId]
  );
  return result.rows;
}

async function addReview(userId, shoeId, rating, comment) {
  if (rating < 1 || rating > 5) throw new Error("Rating must be between 1 and 5");

  const result = await pool.query(
    `INSERT INTO reviews (user_id, shoe_id, rating, comment) 
     VALUES ($1, $2, $3, $4) 
     RETURNING *`,
    [userId, shoeId, rating, comment]
  );
  return result.rows[0];
}

async function deleteReview(id) {
  const result = await pool.query(
    `DELETE FROM reviews WHERE id = $1`,
    [id]
  );
  return result.rowCount;
}

module.exports = { getReviewsByShoe, addReview, deleteReview };
