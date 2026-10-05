const express = require('express');
const router = express.Router();
const db = require('../db');

const DEV_USER_ID = 1;

router.get('/', async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT * FROM locations WHERE user_id = $1 ORDER BY created_at DESC`,
      [DEV_USER_ID]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const { name, latitude, longitude, country, admin1 } = req.body;
  const userId = DEV_USER_ID;

  try {
    const result = await db.query(
      `INSERT INTO locations (user_id, city_name, country_name, admin1_name, latitude, longitude) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [userId, name, country, admin1, latitude, longitude]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;