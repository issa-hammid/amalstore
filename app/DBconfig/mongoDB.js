const mongoose = require("mongoose");

export const connectMongoDB = async () => {
  try {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      return;
    }
    const mongoUrl = process.env.MONGODB_URL || process.env.MONGODB_URI;
    if (!mongoUrl) {
      throw new Error("Neither MONGODB_URL nor MONGODB_URI is defined in environment variables");
    }
    await mongoose.connect(mongoUrl);
    console.log("connected to MongoDB");
  } catch (error) {
    console.error("ERROR WITH CONNECTING MongoDB", error);
    throw error;
  }
};