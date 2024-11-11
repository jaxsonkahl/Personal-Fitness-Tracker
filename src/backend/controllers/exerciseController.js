const { db } = require('../database');

// Function to add a new exercise
function addExercise(req, res) {
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

module.exports = { addExercise };
