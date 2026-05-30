require('dotenv').config();
const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    // Use an environment variable for security
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/gymDB");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Stop the app if connection fails
  }
};

module.exports = connectDB;