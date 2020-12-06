const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: { type: Date, unique: true, default: new Date().setHours(0, 0, 0, 0) },
  exercises: [
    new Schema({
      type: String,
      name: String,
      duration: Number,
      weight: Number,
      reps: Number,
      sets: Number,
    }),
  ],
});

workoutSchema.pre('validate', function () {
  this.day.setHours(0, 0, 0, 0);
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
