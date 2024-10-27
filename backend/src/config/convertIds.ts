import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri: string = process.env.MONGO_URI || '';
const client = new MongoClient(uri);

async function convertIds(): Promise<void> {
    try {
        await client.connect();
        const db = client.db('u09');
        const collection = db.collection('AuthUsers');

        const users = await collection.find().toArray();
        for (const user of users) {
            if (typeof user._id === 'string') {
               const newId = ObjectId.createFromHexString(user._id);
               const { _id, ...rest } = user;
                await collection.insertOne({ _id: newId, ...rest });
                await collection.deleteOne({ _id: user._id });
            }

        }

        console.log('Conversion complete');
    } catch (error) {
        console.error('Error converting IDs:', error);
    } finally {
        await client.close();
    }
}

convertIds();