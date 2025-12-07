const model = require('../models/productModel');

async function fetchAllProducts(req, res) {
    try {
        const products = await model.getAllProducts();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchProductById(req, res) {
    const id = req.params.id;
    try {
        const product = await model.getOneProductById(id);
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

// ✅ CREATE product
async function createProduct(req, res) {
    try {
        const newProduct = await model.createProduct(req.body);
        res.json(newProduct);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

// ✅ DELETE product
async function deleteProduct(req, res) {
    const id = req.params.id;
    try {
        const result = await model.deleteProduct(id);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

module.exports = {
    fetchAllProducts,
    fetchProductById,
    createProduct,
    deleteProduct
};
