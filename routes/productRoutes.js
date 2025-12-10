const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");


router.get("/", productController.fetchAllProducts);


router.get("/:id", productController.fetchProductById);


router.post("/", productController.createProduct);


router.delete("/:id", productController.deleteProduct);

module.exports = router;
