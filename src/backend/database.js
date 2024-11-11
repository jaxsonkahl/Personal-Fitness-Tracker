import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./workout-tracker.db');

// Function to initialize the database and tables
function initializeDatabase() {
  db.serialize(() => {
    // Create Exercises table
    db.run(`CREATE TABLE IF NOT EXISTS Exercises (
      exercise_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
    )`);

    // Create WorkoutLogs table
    db.run(`CREATE TABLE IF NOT EXISTS WorkoutLogs (
      log_id INTEGER PRIMARY KEY AUTOINCREMENT,
      exercise_id INTEGER,
      date TEXT NOT NULL,
      repetitions INTEGER NOT NULL,
      sets INTEGER NOT NULL,
      weight REAL NOT NULL,
      FOREIGN KEY (exercise_id) REFERENCES Exercises(exercise_id)
    )`);

    // Create BodyWeight table
    db.run(`CREATE TABLE IF NOT EXISTS BodyWeight (
      weight_id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      weight REAL NOT NULL
    )`);
  });
}

export { db, initializeDatabase };
