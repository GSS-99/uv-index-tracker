const db = require('../db');
const express = require('express');
const router = express.Router();

// GET /api/uv?lat=37.7749&lon=-122.4194
router.get('/', async (req, res, next) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ 
        error: 'Missing required query parameters: lat and lon' 
      });
    }

    const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max&timezone=auto`;
    const response = await fetch(openMeteoUrl);

    if (!response.ok) {
      throw new Error(`Open-Meteo API responded with status ${response.status}`);
    }

    const data = await response.json();

    res.json({
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      dailyUvMax: data.daily
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;