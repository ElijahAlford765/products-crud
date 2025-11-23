"use strict";
const wishlistModel = require('../models/wishlistModel');

async function fetchWishlist(req, res) {
  try {
    const userId = req.params.userId;
    const items = await wishlistModel.getWishlistByUser(userId);
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

async function addItem(req, res) {
  try {
    const { userId, shoeId } = req.body;
    const item = await wishlistModel.addToWishlist(userId, shoeId);
    if (item) res.status(201).json(item);
    else res.status(409).send("Item already in wishlist");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

async function removeItem(req, res) {
  try {
    const { userId, shoeId } = req.body;
    const deletedCount = await wishlistModel.removeFromWishlist(userId, shoeId);
    if (deletedCount > 0) res.send("Deleted successfully");
    else res.status(404).send("Item not found");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

module.exports = { fetchWishlist, addItem, removeItem };
