// routes/cart.js
"use strict";
const express = require("express");
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get("/:userId", cartController.fetchCart);
router.post("/", cartController.addItem);
router.delete("/:id", cartController.removeItem);

module.exports = router;
