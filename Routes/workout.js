const express = require('express');
const {
    createWorkout,
    getWorkout,
    getWorkouts,
    updateWorkout,
    deleteWorkout
} = require('../Controllers/workoutControllers');

const Workout = require('../Models/WorkOut')

// create instance of router
const router = express.Router();

// handle get request

    // GET all workouts
router.get('/', getWorkouts);
     // GET a single workouts
router.get('/:id', getWorkout);
     // POST a new workouts
router.post('/', createWorkout);
     // DELETE a workout
router.delete('/:id', deleteWorkout);
     // UPDATE a workout
router.patch('/:id', updateWorkout);
module.exports = router;