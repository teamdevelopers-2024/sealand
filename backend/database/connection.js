import mongoose from "mongoose";

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not defined in environment variables");
  }

  try {
    mongoose.set("strictQuery", false);
    const db = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true, // Optional: depending on your version
      useUnifiedTopology: true // Optional: depending on your version
    });
    isConnected = db.connections[0].readyState;
    console.log("Database connected successfully!");
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
  }
}

export default connectDB;
