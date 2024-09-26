import express from "express";
import cors from "cors";
import 'dotenv/config';
import router from "./Router.js";
import connectDB from "./database/connection.js";

const app = express();

const corsOptions = {
  origin: 'https://sealand.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

// Connect to the database
async function initialize() {
  await connectDB();
}

// Health check route
app.get("/", async (req, res) => {
  try {
    await initialize(); // Ensure DB is connected
    console.log("Received request at / route");
    res.status(200).json("Hello, working fine");
  } catch (error) {
    console.error("Error initializing app:", error);
    res.status(500).json({ error: "Initialization error" });
  }
});

// API routes
app.use('/api', router);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
