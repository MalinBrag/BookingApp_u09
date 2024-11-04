import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const uri: string = process.env.MONGO_URI || '';
const client = new MongoClient(uri, { ssl: false });

async function importData(collectionName: string, filePath: string): Promise<void> {
  try {
    await client.connect();
    console.log(`Connected to MongoDB. Importing data to ${collectionName} collection from ${filePath}`);

    const database = client.db("u09");
    const collection = database.collection(collectionName);

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!Array.isArray(data)) {
      throw new Error(`Data format error in ${filePath}: Expected an array of documents.`);
    }

    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents were inserted into ${collectionName} collection`);

  } catch (error) {
    console.error(`Error importing data to ${collectionName}:`, error);
  }
}

async function runImport() {
  try {
    await importData("AuthUsers", path.join(__dirname, "AuthUsers.json"));
    await importData("Bookings", path.join(__dirname, "Bookings.json"));
    }
    finally {
        await client.close();
        console.log("MongoDB connection closed");
        }   
}

runImport().catch(error => console.error("Import failed:", error));
