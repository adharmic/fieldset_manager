// src/db/mongodb.js
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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

export default { client, connectToMongoDB };