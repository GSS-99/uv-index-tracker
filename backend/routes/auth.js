const { Pool, types } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Parse BIGINT (OID 20) as integer in JavaScript
types.setTypeParser(20, (val) => parseInt(val, 10));

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};