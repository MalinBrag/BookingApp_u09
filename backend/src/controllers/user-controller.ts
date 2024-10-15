import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { client } from '../config/db';

const dbName = 'u09';

export const userController = {

    registerUser: async (req: Request, res: Response): Promise<void> => {
        const { name, email, phone, password, role = 'User' } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const db = client.db(dbName);
            const collection = db.collection('AuthUsers');
            
            const existingUser = await collection.findOne({ email });
            if (existingUser) {
                res.status(400).json({ message: 'User email already exists' });
                return;
            }
        
            const newUser = await collection.insertOne(
                { 
                    name, 
                    email, 
                    phone,
                    password: hashedPassword, 
                    role: role || 'user'
                });
            
            const userId = newUser.insertedId;
            const token = jwt.sign(
                { 
                    id: userId, 
                    email,
                    role: role || 'user',
                }, 
                process.env.JWT_SECRET as string, 
                { expiresIn: '1h' }
            );

            res.status(201).json({ 
                message: 'User registered successfully', 
                token,
                userId,
                role: role || 'user',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error during registration' });
        }
    },

    signInUser: async (req: Request, res: Response): Promise<void> => {
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

            const token = jwt.sign(
                { 
                    id: user._id, 
                    role: user.role, 
                }, 
                process.env.JWT_SECRET as string, 
                { expiresIn: '1h' }
            );

            res.json({
                message: 'User signed in successfully',
                token,
                userId: user._id,
                role: user.role,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error during sign in' });
        }
    },

    logoutUser: async (req: Request, res: Response): Promise<void> => {
        res.json({ message: 'User logged out successfully' });
    },

    getProfile: async (req: Request, res: Response): Promise<void> => {
        try {
            const userId: string = (req as any).user.id;
            const db = client.db(dbName);
            const collection = db.collection('AuthUsers');
            const user = await collection.findOne({ _id: new ObjectId(userId) });

            if (!user) {
                res.status(400).json({ message: 'User not found' });
                return;
            }

            res.json({
                email: user.email,
                name: user.name,
                phone: user.phone,
                role: user.role,
                id: user._id,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error during profile retrieval' });
        }
    },
};



