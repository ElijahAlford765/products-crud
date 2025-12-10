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



async function createProduct(req, res) {
    try {
        const newProduct = await model.addProduct(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        console.error("Error creating product:", err);
        res.status(500).json({ error: "Server error while creating product" });
    }
}



async function deleteProduct(req, res) {
    try {
        const id = req.params.id;

        const deleted = await model.deleteProduct(id);

        if (deleted === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).json({ error: "Server error while deleting product" });
    }
}


module.exports = {
    fetchAllProducts,
    fetchProductById,
    createProduct,
    deleteProduct, 
    createProduct
};
