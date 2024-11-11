const express = require('express');
const { addExercise } = require('../controllers/exerciseController');
const router = express.Router();

// POST route for adding exercises
router.post('/add', addExercise);

module.exports = router;
