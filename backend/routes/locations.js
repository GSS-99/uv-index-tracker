const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res, next) => {
  const { name, latitude, longitude, country, admin1 } = req.body;
  const userId = 1;

  try {
    const result = await db.query(
      `INSERT INTO locations (user_id, city_name, country_name, admin1_name, latitude, longitude) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [userId, name, country, admin1, latitude, longitude]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err); // Passes database/JS errors directly to server.js middleware
  }
});

module.exports = router;