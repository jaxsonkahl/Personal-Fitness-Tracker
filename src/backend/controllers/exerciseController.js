// exerciseController.js
import { db } from '../database.js';

// Function to add a new exercise
export function addExercise(req, res) {
  const { name, description } = req.body;
  const query = `INSERT INTO Exercises (name, description) VALUES (?, ?)`;
  db.run(query, [name, description], function(err) {
    if (err) {
      res.status(500).send({ error: 'Failed to add exercise' });
      return;
    }
    res.status(200).send({ message: 'Exercise added successfully', exercise_id: this.lastID });
  });
}

// Function to get all exercises
export function getExercises(req, res) {
  const query = `SELECT * FROM Exercises`;
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).send({ error: 'Failed to retrieve exercises' });
      return;
    }
    res.status(200).send(rows);
  });
}
