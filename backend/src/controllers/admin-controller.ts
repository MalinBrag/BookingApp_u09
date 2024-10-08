import { Request, Response } from "express";
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { client } from "../config/db";
import { sign } from "crypto";

const dbName = "u09";

export const adminController = {

    getAllUsers: async (req: Request, res: Response): Promise<void> => {
        try {
            const db = client.db(dbName);
            const collection = db.collection('AuthUsers');
            const users = await collection.find().toArray();
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error during fetching users' });
        }
    },

    updateUser: async (req: Request, res: Response): Promise<void> => {
        try {
            const { userId } = req.params;
            const updatedData = req.body;

            const db = client.db(dbName);
            const collection = db.collection('AuthUsers');

            const updatedUser = await collection.findOneAndUpdate(
                { _id: new ObjectId(userId) },
                { $set: updatedData },
                { returnDocument: 'after' }
            );

            if (!updatedUser || !updatedUser.value) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.status(200).json({ message: 'User updated successfully', user: updatedUser.value });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error during updating user' });
        }
    },

    deleteUser: async (req: Request, res: Response): Promise<void> => {
        try {
            const { userId } = req.params;

            const db = client.db(dbName);
            const collection = db.collection('AuthUsers');

            const deletedUser = await collection.findOneAndDelete({ _id: new ObjectId(userId) });

            if (!deletedUser || !deletedUser.deletedCount) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error during deleting user' });
        }
    },






}



