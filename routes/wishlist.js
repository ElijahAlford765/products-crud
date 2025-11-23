"use strict";
const express = require("express");
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

router.get("/:userId", wishlistController.fetchWishlist);
router.post("/", wishlistController.addItem);
router.delete("/", wishlistController.removeItem);

module.exports = router;
