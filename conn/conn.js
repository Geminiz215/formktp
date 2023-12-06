import { MongoClient } from "mongodb";

export default async function connectDB() {
  const url = process.env.MONGODB_URI;

  const dbName = process.env.MONGODB_DB;

  try {
    const client = await MongoClient.connect(url);

    console.log("Connected successfully to server");

    const db = client.db(dbName);

    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
