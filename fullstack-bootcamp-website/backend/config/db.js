/**
 * Database Configuration Module
 * Establishes connection to MongoDB Atlas using Mongoose ODM.
 */

import mongoose from 'mongoose';

/**
 * Connects to MongoDB Atlas using MONGO_URI from environment variables.
 * Handles successful connection and connection errors gracefully.
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('Neither MONGO_URI nor MONGODB_URI environment variable is defined in .env file.');
    }
    const conn = await mongoose.connect(mongoUri);
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    // Exit process with failure code if database connection fails
    process.exit(1);
  }
};

export default connectDB;
