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

router.put('/workouts/:id', async function(req, res) {
  const id = req.params.id;

  try {
    const workout = await db.Workout.findOne({ _id: id});
    if (!workout) res.status(404).json({ error: 'Workout not found.' });

    workout.exercises.push(req.body);
    workout.save();
    res.status(200).json(workout);
  } catch(err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
});

function getThisSundayDate() {
  const today = new Date();
  const thisSunday = new Date(today.setDate(today.getDate() - today.getDay()));
  thisSunday.setHours(0, 0, 0, 0);
  return thisSunday;
}

module.exports = router;
