// exerciseRoutes.js
import express from 'express';
import {
  addExercise,
  getExercises,
  updateExercise,
  deleteExercise,
  addWorkoutLog,
  getBodyWeightLogs,
  getWorkoutLogs,
  addBodyWeightLogs
} from '../controllers/exerciseController.js';

const router = express.Router();

// Routes for Exercises
router.post('/add', addExercise); // Route to add a new exercise
router.get('/', getExercises); // Route to get all exercises
router.put('/:id', updateExercise); // Route to update an exercise by ID
router.delete('/:id', deleteExercise); // Route to delete an exercise by ID

// Routes for Workout Logs
router.post('/workout-logs/add', addWorkoutLog); // Route to add a new workout log
router.get('/workout-logs', getWorkoutLogs); // Route to get workout logs by query parameters (exercise ID, date range)

// Routes for Body Weight Logs
router.post('/body-weight/add', addBodyWeightLogs); // Route to add a body weight log
router.get('/body-weight', getBodyWeightLogs); // Route to get body weight logs by date range

export default router;
