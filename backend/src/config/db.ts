import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri: string = process.env.MONGO_URI || '';
const client = new MongoClient(uri);
let isConnected = false;

/**
 * Connects to the database if not already connected
 */
export const connect_db = async () => {
    if (!isConnected) {
        try {
            await client.connect();
            console.log('Connected to database');
        } catch (error) {
            console.error('Failed to connect', error);
            process.exit(1);
        }
    }
};

export { client };







