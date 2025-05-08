import mongoose from "mongoose";

const uri = process.env.MONGO_URI as string;

export async function connectToMongo() {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}
