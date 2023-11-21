import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let database;

if (!client) {
  client = new MongoClient(uri, options);
}

export async function connectDB() {
  await client.connect();
  database = client.db(process.env.MONGODB_DB);
  return database;
}

export async function insertDocument(collectionName, document) {
  const db = await connectDB();

  // Add createdAt and modifiedAt fields
  const timestamp = new Date();
  document.createdAt = timestamp;
  document.modifiedAt = timestamp;

  const result = await db.collection(collectionName).insertOne(document);
  return result;
}

export async function updateDocument(collectionName, id, updatedFields) {
  const db = await connectDB();

  // Update modifiedAt field
  updatedFields.modifiedAt = new Date();

  const result = await db.collection(collectionName).updateOne(
    { _id: ObjectId(id) },
    { $set: updatedFields }
  );

  return result;
}

export async function findAllDocuments(collectionName) {
  const db = await connectDB();
  const documents = await db.collection(collectionName).find().toArray();
  return documents;
}
