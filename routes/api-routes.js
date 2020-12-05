const router = require('express').Router();
const db = require('../models');

router.get('/workouts', async function(req, res) {
  try {
    const workouts = await db.Workout.find({});
    res.status(200).json(workouts);
  } catch(err) {
    res.status(404).json({ error: err });
  }
});

module.exports = router;