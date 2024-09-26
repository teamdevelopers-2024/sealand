import mongoose from "mongoose";

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

    try {
        mongoose.set("strictQuery", false); // Optional setting for query behavior
        // Connect to the database
        const db = await mongoose.connect(process.env.MONGO_URL);
        isConnected = db.connection.readyState; // Update connection status
        console.log("Database connected successfully!");
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
    }
}

export default connectDB;
