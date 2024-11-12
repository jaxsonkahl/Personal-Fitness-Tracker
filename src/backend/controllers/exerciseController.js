// exerciseController.js
import { db } from '../database.js';

/**
 * Adds a new exercise or updates the description if the exercise already exists.
 */
export function addExercise(req, res) {
  const { name, description } = req.body;

  // Check if an exercise with the same name already exists
  const checkQuery = `SELECT * FROM Exercises WHERE name = ?`;
  db.get(checkQuery, [name], (err, row) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
      return;
    }

    if (row) {
      // If exercise exists, check if the description matches
      if (row.description === description) {
        res.status(200).json({ message: 'Exercise already added' });
      } else {
        // Update the description if it differs
        const updateQuery = `UPDATE Exercises SET description = ? WHERE name = ?`;
        db.run(updateQuery, [description, name], function (err) {
          if (err) {
            res.status(500).json({ error: 'Failed to update exercise description' });
            return;
          }
          res.status(200).json({ message: 'Exercise description updated successfully' });
        });
      }
    } else {
      // Insert a new exercise if it doesn't exist
      const insertQuery = `INSERT INTO Exercises (name, description) VALUES (?, ?)`;
      db.run(insertQuery, [name, description], function (err) {
        if (err) {
          res.status(500).json({ error: 'Failed to add exercise' });
          return;
        }
        res.status(200).json({ message: 'Exercise added successfully', exercise_id: this.lastID });
      });
    }
  });
}

/**
 * Retrieves all exercises from the database.
 */
export function getExercises(req, res) {
  db.all(`SELECT * FROM Exercises`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve exercises' });
    res.status(200).json(rows);
  });
}

/**
 * Updates an existing exercise by its ID.
 */
export function updateExercise(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;
  const query = `UPDATE Exercises SET name = ?, description = ? WHERE exercise_id = ?`;
  
  db.run(query, [name, description, id], function (err) {
    if (err) return res.status(500).json({ error: 'Failed to update exercise' });
    if (this.changes === 0) return res.status(404).json({ error: 'Exercise not found' });
    res.status(200).json({ message: 'Exercise updated successfully' });
  });
}

/**
 * Deletes an exercise by its ID.
 */
export function deleteExercise(req, res) {
  const { id } = req.params;
  const query = `DELETE FROM Exercises WHERE exercise_id = ?`;

  db.run(query, [id], function (err) {
    if (err) return res.status(500).json({ error: 'Failed to delete exercise' });
    if (this.changes === 0) return res.status(404).json({ error: 'Exercise not found' });
    res.status(200).json({ message: 'Exercise deleted successfully' });
  });
}

/**
 * Adds a new workout log entry.
 */
export function addWorkoutLog(req, res) {
  const { exercise_id, date, repetitions, sets, weight } = req.body;

  // Check if all workout log fields are provided
  if (!exercise_id || !date || !repetitions || !sets || !weight) {
    return res.status(400).json({ error: 'All workout log fields are required' });
  }

  const query = `INSERT INTO WorkoutLogs (exercise_id, date, repetitions, sets, weight) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [exercise_id, date, repetitions, sets, weight], function (err) {
    if (err) return res.status(500).json({ error: 'Failed to add workout log' });
    res.status(200).json({ message: 'Workout log added successfully', log_id: this.lastID });
  });
}

/**
 * Retrieves all workout logs from the database.
 */
export function getWorkoutLogs(req, res) {
  const query = `SELECT * FROM WorkoutLogs`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve workout logs' });
    }
    res.status(200).json(rows);
  });
}

/**
 * Adds a body weight log entry.
 */
export function addBodyWeightLogs(req, res) {
  const { date, weight } = req.body;

  // Check if both date and weight are provided
  if (!date || weight === undefined) {
    return res.status(400).json({ error: 'Both date and weight are required' });
  }

  const query = `INSERT INTO BodyWeight (date, weight) VALUES (?, ?)`;
  db.run(query, [date, weight], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to add body weight log' });
    }
    res.status(200).json({ message: 'Body weight log added successfully', weight_id: this.lastID });
  });
}

/**
 * Retrieves all body weight logs from the database.
 */
export function getBodyWeightLogs(req, res) {
  const query = `SELECT * FROM BodyWeight`;
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve body weight logs' });
    res.status(200).json(rows);
  });
}
