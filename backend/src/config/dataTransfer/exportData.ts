import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const uri: string = process.env.MONGO_URI || '';
const client = new MongoClient(uri);

async function exportCollection(collectionName: string, outputPath: string) {
    try {
        await client.connect();
        const database = client.db('u09');
        const collection = database.collection(collectionName);

        const data = await collection.find({}).toArray();
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
        console.log(`Exported ${data.length} documents from ${collectionName} to ${outputPath}`);
  } catch (error) {
    console.error(`Failed to export data from ${collectionName}:`, error);
  }

}

async function runExport() {
    try {
      await exportCollection("AuthUsers", path.join(__dirname, "AuthUsers.json"));
      await exportCollection("Bookings", path.join(__dirname, "Bookings.json")); 
    } finally {
      await client.close();
      console.log("MongoDB connection closed");
    }
  }
  
  runExport().catch(error => console.error("Export failed:", error));