// exerciseRoutes.js
import express from 'express';
import { addExercise, getExercises } from '../controllers/exerciseController.js'; // Update the path as needed

const router = express.Router();

router.post('/add', addExercise);
router.get('/', getExercises);

export default router;
