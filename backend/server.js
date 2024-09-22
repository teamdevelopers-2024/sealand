import express from "express";
import cors from "cors"; // Import CORS package
import 'dotenv/config';
import router from "./Router.js";

// Initialize the Express application
const app = express();

// Define a port to listen on
const PORT = process.env.PORT || 5000;

// Middleware configuration

// Set up CORS with options (adjust the origin as needed)
const corsOptions = {
    origin: [
      'http://localhost:5173', // Add your frontend URL
      'http://localhost:4200',
      'http://localhost:5000',
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allows cookies to be sent from the frontend
  };
  
  app.use(cors(corsOptions));
  

// Parse incoming JSON requests (replaces body-parser.json())
app.use(express.json());

// Parse URL-encoded requests (replaces body-parser.urlencoded())
app.use(express.urlencoded({ extended: true }));

// Use your defined routes
app.use('/api', router);

// Start the server
function start(callback) {
  app.listen(PORT, (err) => {
    if (err) {
      return callback(err);
    }
    console.log(`Backend server is running on port ${3000}`);
    callback();
  });
}


export default { start };
