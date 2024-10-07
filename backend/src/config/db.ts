import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri: string = process.env.MONGO_URI || '';
const client = new MongoClient(uri);

export const connect_db = async () => {
    try {
        await client.connect();
        console.log('Connected to database');
    } catch (error) {
        console.error('Failed to connect', error);
        process.exit(1);
    }
};

export { client };







