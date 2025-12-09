const pool = require("./db");

async function getAllProducts() {
    const result = await pool.query("SELECT * FROM products");
    return result.rows;
}

async function getOneProductById(id) {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    return result.rows[0];
}

async function addProduct(data) {
    const {
        name,
        brand,
        sizes,
        description,
        image_url,
        price,
        sellerId,
        type
    } = data;

    const sku = "SKU-" + Date.now();  // ✅ AUTO-GENERATE SKU

    const result = await pool.query(
        `INSERT INTO products
        (name, brand, sizes, description, image_url, price, seller_id, type, sku)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
         RETURNING *`,
        [name, brand, sizes, description, image_url, price, sellerId, type, sku]
    );

    return result.rows[0];
}

async function deleteProduct(id) {
    const result = await pool.query("DELETE FROM products WHERE id = $1", [id]);
    return result.rowCount;
}

module.exports = {
    getAllProducts,
    getOneProductById,
    addProduct,
    deleteProduct
};
