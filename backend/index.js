import express from "express";
import cors from "cors";
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
    credentials: true,
};

app.use(cors(corsOptions));
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong, please try again later.' });
});

// Simple route for health check
app.get("/", (req, res) => {
    res.status(200).json("Hello working");
});

// API routes
app.use('/api', router);

// Wrap the app with ServerlessHttp and export it as default
export default ServerlessHttp(app); // Change here to default export
