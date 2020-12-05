const router = require('express').Router();
const db = require('../models');

router.get('/workouts', async function(req, res) {
  try {
    const workouts = await db.Workout.find({});
    res.status(200).json(workouts);
  } catch(err) {
    res.status(500).json({ error: err });
  }
});

router.post('/workouts', async function(req, res) {
  try {
    const newWorkout = await db.Workout.create(req.body);
    res.status(201).json(newWorkout);
  } catch(err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;