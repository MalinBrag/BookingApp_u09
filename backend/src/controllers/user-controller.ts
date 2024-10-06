import { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { client } from '../config/db';
import { sign } from 'crypto';

//const client = new MongoClient(process.env.MONGO_URI || '');
const dbName = 'u09';

export const userController = {

    registerUser: async (req: Request, res: Response): Promise<void> => {
        //await client.connect();
        const { name, email, password, password_confirmation } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const db = client.db(dbName);
            const collection = db.collection('AuthUsers');
            
            const existingUser = await collection.findOne({ email });
            if (existingUser) {
                res.status(400).json({ message: 'User email already exists' });
                return;
            }
        
            await collection.insertOne({ name, email, password: hashedPassword });
            const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
                expiresIn: '1h',
            });
            res.status(201).json({ 
                message: 'User registered successfully', 
                token 
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error during registration' });
        }
    },

    signInUser: async (req: Request, res: Response): Promise<void> => {
        //await client.connect();
        const { email, password } = req.body;

        try {
            const db = client.db(dbName);
            const collection = db.collection('AuthUsers');
            const user = await collection.findOne({ email });

            if (!user) {
                res.status(400).json({ message: 'User not found' });
                return;
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).json({ message: 'Invalid credentials' });
                return;
            }

            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET as string, {
                 expiresIn: '1h',
            });

            res.json({
                message: 'User signed in successfully',
                token,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error during sign in' });
        }
    },
};



