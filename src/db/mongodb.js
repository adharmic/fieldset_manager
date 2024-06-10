import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true });
let db;

async function connectToMongoDB() {
  try {
    await client.connect();
    db = client.db("mydatabase");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

async function addDataToMongoDB(data) {
  try {
    const collection = db.collection("mycollection");
    await collection.insertOne(data);
    console.log("Data added to MongoDB");
  } catch (error) {
    console.error("Failed to add data to MongoDB", error);
    throw error;
  }
}

export { connectToMongoDB, addDataToMongoDB };