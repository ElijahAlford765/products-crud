const pool = require('../models/db');


async function getAllUsers() {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
}


async function getOneUserById(id) {
    const result = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
    return result.rows[0];
}


async function deleteUser(id) {
    const result = await pool.query("DELETE FROM users WHERE id=$1", [id]);
    return result.rowCount;
}


async function getUserByEmail(email) {
    const result = await pool.query(
        "SELECT * FROM users WHERE LOWER(TRIM(email)) = LOWER(TRIM($1)) LIMIT 1",
        [email]
    );
    return result.rows[0];
}

async function addUser({ username, email, password_hash, firstname = null, lastname = null }) {
    const query = `
        INSERT INTO users (username, email, password_hash, firstname, lastname)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [username, email, password_hash, firstname, lastname];
    const result = await pool.query(query, values);
    return result.rows[0];
}

module.exports = {
    getAllUsers,
    getOneUserById,
    deleteUser,
    addUser,
    getUserByEmail
};
