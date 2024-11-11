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

router.post('/add', addExercise);
router.get('/', getExercises);
router.put('/:id', updateExercise);
router.delete('/:id', deleteExercise);
router.post('/workout-logs/add', addWorkoutLog); // Route for adding workout logs
router.get('/workout-logs', getWorkoutLogs); // Route for retrieving workout logs
router.post('/body-weight/add', addBodyWeightLogs);    // Route for retrieving body weight logs
router.get('/body-weight', getBodyWeightLogs);

export default router;
