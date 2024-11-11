import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { initializeDatabase } from './database.js'; // Make sure to add .js extension for ES modules
import exerciseRoutes from './routes/exerciseRoutes.js'; // Ensure the path has .js extension

const app = express();
const port = 3000;

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Initialize Database
initializeDatabase();

// Set up routes
app.use('/exercises', exerciseRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Workout Tracker API');
});

// Start the server if this script is run directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

// Export app for testing
export { app };
