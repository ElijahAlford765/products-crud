require('dotenv').config();
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // <- make sure this is correct
  ssl: { rejectUnauthorized: false }           // optional
});

module.exports = pool;
