import mongoose from "mongoose";
import "dotenv/config"
let isConnected; // Tracks the connection status

async function connectDB() {
    // Check if already connected
    if (isConnected) {
        console.log("Using existing database connection");
        return;
    }

    // Check if MONGO_URL is defined in environment variables
    if (!process.env.MONGO_URL) {
        throw new Error('MONGO_URL is not defined in environment variables');
    }

    console.log("MongoDB URI:", process.env.MONGO_URL); // Debugging output

    try {
        mongoose.set("strictQuery", false); // Optional setting for query behavior
        mongoose.set('debug', true); // Enable Mongoose debug mode
        // Connect to the database
        const db = await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 15000, // Increase timeout to 15 seconds
        });
        isConnected = mongoose.connection.readyState; // Update connection status
        console.log("Database connected successfully!");
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
    }
}

export default connectDB;
