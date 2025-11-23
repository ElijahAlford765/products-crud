"use strict";
const cartModel = require('../models/cartModel');

async function fetchCart(req, res) {
  try {
    const userId = req.params.userId;
    const items = await cartModel.getCartByUser(userId);
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

async function addItem(req, res) {
  try {
    const { userId, shoeId, quantity } = req.body;
    const item = await cartModel.addToCart(userId, shoeId, quantity);
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

async function removeItem(req, res) {
  try {
    const id = req.params.id;
    const deletedCount = await cartModel.removeFromCart(id);
    if (deletedCount > 0) res.send("Deleted successfully");
    else res.status(404).send("Item not found");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

module.exports = { fetchCart, addItem, removeItem };
