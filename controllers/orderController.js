"use strict";
const pool = require("../db"); 


async function placeOrder(req, res) {
  try {
    
    if (!req.session.user) return res.status(401).json({ message: "Not logged in" });

    const userId = req.session.user.id;

    
    const cartResult = await pool.query(
      `SELECT c.id AS cart_id, c.product_id, c.size, c.gender, c.quantity, p.name, p.price
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id=$1`,
      [userId]
    );

    const cartItems = cartResult.rows;
    if (cartItems.length === 0) return res.status(400).json({ message: "Cart is empty" });

   
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    
    const orderResult = await pool.query(
      `INSERT INTO orders (user_id, total_amount, status)
       VALUES ($1, $2, 'pending') RETURNING *`,
      [userId, total]
    );
    const order = orderResult.rows[0];

   
    for (const item of cartItems) {
      await pool.query(
        `INSERT INTO order_items (order_id, product_id, size, gender, quantity, price)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [order.id, item.product_id, item.size, item.gender, item.quantity, item.price]
      );
    }

  
    await pool.query(`DELETE FROM cart WHERE user_id=$1`, [userId]);

    res.json({ success: true, message: "Order placed", orderId: order.id, total, items: cartItems });
  } catch (err) {
    console.error("PLACE ORDER ERROR:", err);
    res.status(500).json({ message: "Server error placing order" });
  }
}


async function getOrders(req, res) {
  try {
    if (!req.session.user) return res.status(401).json({ message: "Not logged in" });
    const userId = req.session.user.id;

    const ordersResult = await pool.query(
      `SELECT o.id, o.total_amount, o.status, o.created_at,
              json_agg(
                json_build_object(
                  'product_id', oi.product_id,
                  'size', oi.size,
                  'gender', oi.gender,
                  'quantity', oi.quantity,
                  'price', oi.price
                )
              ) AS items
       FROM orders o
       JOIN order_items oi ON o.id = oi.order_id
       WHERE o.user_id=$1
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [userId]
    );

    res.json(ordersResult.rows);
  } catch (err) {
    console.error("GET ORDERS ERROR:", err);
    res.status(500).json({ message: "Server error fetching orders" });
  }
}

module.exports = { placeOrder, getOrders };
