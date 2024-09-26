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
  origin: '*',  // You can adjust this based on your specific needs
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

// Connect to the database
connectDB();

// Parse incoming JSON requests
app.use(express.json());

// Parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Simple route for health check
app.get("/", (req, res) => {
  res.status(200).json("Hello working");
});

// API routes
app.use('/api', router);

// Wrap the app with ServerlessHttp and export it as a handler for Vercel
export const handler = ServerlessHttp(app);
