import express from 'express';

const app = express();
const PORT = 5000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Simple route to check if the server is running
app.get('/', (req, res) => {
    res.send('Hello, World! Your server is running!');
  });
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });