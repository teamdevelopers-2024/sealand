// db.js
import mongoose from 'mongoose';

// MongoDB connection string from environment variable
const uri = process.env.MONGO_URL;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      // Options are not needed for version 4.x and above
    });
    console.log('Database connected successfully!');
  } catch (err) {
    console.error('Database connection error is:', err);
  }
};

// Export the connect functions
export default connectDB;
