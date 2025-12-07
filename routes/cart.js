"use strict";
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.fetchCart);
router.post("/", cartController.addItem);
router.put("/:id", cartController.updateItem);
router.delete("/:id", cartController.removeItem);

module.exports = router;
