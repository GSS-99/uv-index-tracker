const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/locations - Fetch all locations
router.get('/', async (req, res, next) => {
  try {
    // Aligned column name: city_name
    const query = 'SELECT id, user_id, city_name, latitude, longitude, created_at FROM locations ORDER BY created_at DESC';
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

// POST /api/locations - Save a location
router.post('/', async (req, res, next) => {
  try {
    const { city_name, latitude, longitude, user_id } = req.body;

    const activeUserId = user_id || 1;

    if (!city_name || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ 
        error: 'Missing required fields: city_name, latitude, longitude' 
      });
    }

    // Convert coordinates to floats before inserting
    const latNum = parseFloat(latitude);
    const lonNum = parseFloat(longitude);

    if (isNaN(latNum) || isNaN(lonNum)) {
      return res.status(400).json({ error: 'Latitude and longitude must be valid numbers' });
    }

    const query = `
      INSERT INTO locations (user_id, city_name, latitude, longitude)
      VALUES ($1, $2, $3, $4)
      RETURNING id, user_id, city_name, latitude, longitude, created_at;
    `;
    const values = [activeUserId, city_name, latNum, lonNum];

    const { rows } = await db.query(query, values);
    
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/locations/:id - Delete location
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = 'DELETE FROM locations WHERE id = $1 RETURNING id;';
    const { rows } = await db.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Location not found' });
    }

    res.json({ message: 'Location deleted successfully', id: rows[0].id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;