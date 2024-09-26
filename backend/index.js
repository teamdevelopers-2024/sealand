import express from "express";
import cors from "cors"; // Import CORS package
import 'dotenv/config';
import router from "./Router.js";
import connectDB from "./database/connection.js";
import ServerlessHttp from "serverless-http";

// Initialize the Express application
const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://sealand.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // This allows cookies or credentials to be sent with the request
};



app.use(cors(corsOptions));





// Connect to the database
connectDB();

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// In your route handler
router.post('/login', async (req, res) => {
  try {
      console.log('Login attempt:', req.body);
      // Your login logic
  } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


// Parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging
  res.status(500).json({ error: 'Something went wrong, please try again later.' });
});


// Parse URL-encoded requests

// Simple route for health check
app.get("/", (req, res) => {
  res.status(200).json("Hello working");
});

// API routes
app.use('/api', router);


export const handler = ServerlessHttp(app);
