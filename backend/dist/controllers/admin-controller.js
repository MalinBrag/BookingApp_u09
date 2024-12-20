"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../config/db");
const dbName = "u09";
exports.adminController = {
    /**
     * Gets all users from the database
     * @param req
     * @param res
     */
    getAllUsers: async (req, res) => {
        try {
            const db = db_1.client.db(dbName);
            const collection = db.collection('AuthUsers');
            const users = await collection.find().toArray();
            res.status(200).json(users);
        }
        catch (error) {
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
    getUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const db = db_1.client.db(dbName);
            const collection = db.collection('AuthUsers');
            const user = await collection.findOne({ _id: new mongodb_1.ObjectId(userId) });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json(user);
        }
        catch (error) {
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
    updateUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const updatedData = req.body;
            const db = db_1.client.db(dbName);
            const collection = db.collection('AuthUsers');
            const updatedUser = await collection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(userId) }, { $set: updatedData }, { returnDocument: 'after' });
            if (!updatedUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json({ message: 'User updated successfully', user: updatedUser.value });
        }
        catch (error) {
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
    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const db = db_1.client.db(dbName);
            const collection = db.collection('AuthUsers');
            const deletedUser = await collection.findOneAndDelete({ _id: new mongodb_1.ObjectId(userId) });
            if (!deletedUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json({ message: 'User deleted successfully' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error during deleting user' });
        }
    },
};
