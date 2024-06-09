import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db();
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
}

export { connectToMongoDB, client };