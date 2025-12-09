const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Place a new order
router.post("/", orderController.placeOrder);

// Get current user's orders
router.get("/", orderController.getOrders);

module.exports = router;
