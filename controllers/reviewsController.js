"use strict";
const reviewsModel = require('../models/reviewsModel');

async function fetchReviews(req, res) {
  try {
    const shoeId = req.params.shoeId;
    const reviews = await reviewsModel.getReviewsByShoe(shoeId);
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

async function addReview(req, res) {
  try {
    const { userId, shoeId, rating, comment } = req.body;
    const review = await reviewsModel.addReview(userId, shoeId, rating, comment);
    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
}

async function removeReview(req, res) {
  try {
    const id = req.params.id;
    const deletedCount = await reviewsModel.deleteReview(id);
    if (deletedCount > 0) res.send("Deleted successfully");
    else res.status(404).send("Review not found");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

module.exports = { fetchReviews, addReview, removeReview };
