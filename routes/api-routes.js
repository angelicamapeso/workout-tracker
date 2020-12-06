const router = require('express').Router();
const db = require('../models');

router.get('/workouts', async function (req, res) {
  try {
    const workouts = await db.Workout.find({});
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post('/workouts', async function (req, res) {
  try {
    // only create it if a workout doesn't exist for that day
    const newWorkout = new db.Workout();
    const existingWorkout = await db.Workout.findOne({ day: newWorkout.day });
    if (existingWorkout) {
      res.status(201).json(existingWorkout);
    } else {
      newWorkout.save();
      res.status(201).json(newWorkout);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put('/workouts/:id', async function (req, res) {
  const id = req.params.id;

  try {
    const workout = await db.Workout.findOne({ _id: id });
    if (!workout) res.status(404).json({ error: 'Workout not found.' });

    workout.exercises.push(req.body);
    workout.save();
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
});

// Retrieves workouts for that week
router.get('/workouts/range', async function (req, res) {
  const thisSunday = getThisSundayDate();
  try {
    const workouts = await db.Workout.find({
      day: { $gte: thisSunday },
    });
    const formattedWorkouts = formatWorkouts(workouts);
    res.status(200).json(formattedWorkouts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

function getThisSundayDate() {
  const today = new Date();
  const thisSunday = new Date(today.setDate(today.getDate() - today.getDay()));
  thisSunday.setHours(0, 0, 0, 0);
  return thisSunday;
}

// Format workouts so that each workout is in the
// correct position of the workouts array
// 0 - this Sunday
// 1 - this Monday
// etc.
function formatWorkouts(workouts) {
  const workoutArray = [];
  for (let i = 0; i < 7; i++) {
    const dayWorkout = workouts.find(workout => workout.day.getDay() === i);
    if (dayWorkout) {
      workoutArray.push(dayWorkout);
    } else {
      const fillerDate = new Date();
      fillerDate.setDate(new Date().getDate() - (6 - i));
      fillerDate.setHours(0, 0, 0, 0);
      workoutArray.push({
        day: new Date(fillerDate),
        exercises: [],
      });
    }
  }
  console.log(workoutArray);
  return workoutArray;
}

module.exports = router;
