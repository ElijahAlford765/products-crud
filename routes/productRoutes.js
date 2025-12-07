const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// GET all products
router.get("/", productController.fetchAllProducts);

// GET product by ID
router.get("/:id", productController.fetchProductById);

// CREATE product
router.post("/", productController.createProduct);

// DELETE product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
