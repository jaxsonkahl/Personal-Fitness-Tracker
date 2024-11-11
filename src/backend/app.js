const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initializeDatabase } = require('./database');

const app = express();
const port = 3000;

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Initialize Database
initializeDatabase();

// Import and set up routes
const exerciseRoutes = require('./routes/exerciseRoutes');
app.use('/exercises', exerciseRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Workout Tracker API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
