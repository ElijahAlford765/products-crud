"use strict";
const express = require("express");
const router = express.Router();

const cors = require('cors');

const corsOptions = {
  //origin: 'http://localhost:5173', // react frontend URL(not necessary for same origin or production)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true // Allow cookies and authentication headers
};

router.use(cors(corsOptions));
const productController = require('../controllers/productController');

router.get("/", productController.fetchAllProducts);
router.get("/:id", productController.fetchProductById);
router.delete("/:id", productController.removeProduct);
router.post("/", productController.createProduct);
module.exports = router;
