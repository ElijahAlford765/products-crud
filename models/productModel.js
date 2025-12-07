const pool = require('./db');

async function getAllProducts() {
    const result = await pool.query("SELECT * FROM products");
    return result.rows;
}

async function getOneProductById(id) {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    return result.rows[0];
}

async function addProduct(name, type, price, description) {
    const result = await pool.query(
        "INSERT INTO products (name, type, price, description) VALUES ($1,$2,$3,$4) RETURNING *",
        [name, type, price, description]
    );
    return result.rows[0];
}

async function deleteProduct(id) {
    const result = await pool.query("DELETE FROM products WHERE id = $1", [id]);
    return result.rowCount;
}

module.exports = { getAllProducts, getOneProductById, addProduct, deleteProduct };
