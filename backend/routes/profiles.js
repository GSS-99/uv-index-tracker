const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/profiles/:userId - Get user profile
router.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const query = 'SELECT id, user_id, fitzpatrick_type, preferred_spf FROM profiles WHERE user_id = $1';
    const { rows } = await db.query(query, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

// PUT /api/profiles/:userId - Update or Insert user profile (Upsert)
router.put('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { fitzpatrick_type, preferred_spf } = req.body;

    if (fitzpatrick_type && (fitzpatrick_type < 1 || fitzpatrick_type > 6)) {
      return res.status(400).json({ error: 'fitzpatrick_type must be between 1 and 6' });
    }

    const query = `
      INSERT INTO profiles (user_id, fitzpatrick_type, preferred_spf)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id) 
      DO UPDATE SET 
        fitzpatrick_type = EXCLUDED.fitzpatrick_type,
        preferred_spf = EXCLUDED.preferred_spf
      RETURNING id, user_id, fitzpatrick_type, preferred_spf;
    `;
    const values = [userId, fitzpatrick_type || null, preferred_spf || 30];

    const { rows } = await db.query(query, values);
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;