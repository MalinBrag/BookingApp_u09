import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { client } from "../config/db";

const dbName = "u09";

export const adminController = {

    /**
     * Gets all users from the database
     * @param req 
     * @param res 
     */
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

    /**
     * Gets a single user from the database based on the userId
     * @param req 
     * @param res 
     * @returns user data
     */
    getUser: async (req: Request, res: Response): Promise<void> => {
        try {
            const { userId } = req.params;
            const db = client.db(dbName);
            const collection = db.collection('AuthUsers');
            const user = await collection.findOne({ _id: new ObjectId(userId) });

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error during fetching user' });
        }
    },

    /**
     * Updates a user in the database
     * @param req 
     * @param res 
     * @returns the updated user data
     */
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

            if (!updatedUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.status(200).json({ message: 'User updated successfully', user: updatedUser.value });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error during updating user' });
        }
    },

    /**
     * Deletes a user from the database
     * @param req 
     * @param res 
     * @returns a string message
     */
    deleteUser: async (req: Request, res: Response): Promise<void> => {
        try {
            const { userId } = req.params;

            const db = client.db(dbName);
            const collection = db.collection('AuthUsers');

            const deletedUser = await collection.findOneAndDelete({ _id: new ObjectId(userId) });

            if (!deletedUser) {
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



