import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI as string;
const db = process.env.DB_NAME;
const client = new MongoClient(uri);

export async function connectToMongo() {
  try {
    await client.connect();
    console.log("✅ MongoDB connected");
    return client.db(db);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}
