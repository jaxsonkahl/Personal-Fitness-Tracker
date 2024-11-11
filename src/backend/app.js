const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initializeDatabase } = require('./database');

const app = express();
const port = 3000;

// Middlewares
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Initialize Database
initializeDatabase();

// Set up routes (You will create these later)
app.get('/', (req, res) => {
  res.send('Workout Tracker API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
