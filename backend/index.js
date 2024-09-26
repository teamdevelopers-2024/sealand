import express from "express";
import cors from "cors"; // Import CORS package
import 'dotenv/config';
import router from "./Router.js";
import connectDB from "./database/connection.js";
import ServerlessHttp from "serverless-http";

// Initialize the Express application
const app = express();

// Define a port to listen on
const PORT = process.env.PORT || 5000;


const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};


app.use(cors(corsOptions));

connectDB();

// Parse incoming JSON requests (replaces body-parser.json())
app.use(express.json());

// Parse URL-encoded requests (replaces body-parser.urlencoded())
app.use(express.urlencoded({ extended: true }));



app.use('/',router)

// Use your defined routes
// app.use('/.netlify/functions/', router);

// Start the server
// function start(callback) {
//   app.listen(PORT, (err) => {
//     if (err) {
//       return callback(err);
//     }
//     console.log(`Backend server is running on port ${3000}`);
//     callback();
//   });
// }

// export const handler = ServerlessHttp(app)

app.listen(PORT, (err) => {
  console.log(`Backend server is running on port ${PORT}`);
})


