"use strict";
const express = require("express");
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

router.get("/:shoeId", reviewsController.fetchReviews);
router.post("/", reviewsController.addReview);
router.delete("/:id", reviewsController.removeReview);

module.exports = router;
