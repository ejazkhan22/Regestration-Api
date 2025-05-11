const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri ="mongodb+srv://ejaz42338:noormoin@cluster3.elnfqvl.mongodb.net/"
    if (!uri) {
      throw new Error("MongoDB URI is missing in .env file");
    }
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

module.exports = connectDB;