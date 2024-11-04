"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const mongodb_1 = require("mongodb");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
const dbName = 'u09';
exports.userController = {
    /**
     * Registers a new user in the database
     * @param req
     * @param res
     * @returns a token, user ID and role
     */
    registerUser: async (req, res) => {
        const { name, email, phone, password, role = 'User' } = req.body;
        try {
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            const db = db_1.client.db(dbName);
            const collection = db.collection('AuthUsers');
            const existingUser = await collection.findOne({ email });
            if (existingUser) {
                res.status(400).json({ message: 'User email already exists' });
                return;
            }
            const newUser = await collection.insertOne({
                name,
                email,
                phone,
                password: hashedPassword,
                role: role || 'user'
            });
            const userId = newUser.insertedId;
            const token = jsonwebtoken_1.default.sign({
                id: userId,
                email,
                role: role || 'User',
            }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(201).json({
                message: 'User registered successfully',
                token,
                userId,
                role: role || 'User',
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error during registration' });
        }
    },
    /**
     * Checks if the user exists and the password is correct
     * @param req
     * @param res
     * @returns a token, user ID and role
     */
    signInUser: async (req, res) => {
        const { email, password } = req.body;
        try {
            const db = db_1.client.db(dbName);
            const collection = db.collection('AuthUsers');
            const user = await collection.findOne({ email });
            if (!user) {
                res.status(400).json({ message: 'User not found' });
                return;
            }
            const isMatch = await bcrypt_1.default.compare(password, user.password);
            if (!isMatch) {
                res.status(400).json({ message: 'Invalid credentials' });
                return;
            }
            const token = jsonwebtoken_1.default.sign({
                id: user._id,
                email: user.email,
                role: user.role,
            }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({
                message: 'User signed in successfully',
                token,
                userId: user._id,
                role: user.role,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error during sign in' });
        }
    },
    /**
     * Logs out the user
     * @param req
     * @param res
     */
    logoutUser: async (req, res) => {
        res.status(200).json({ message: 'User logged out successfully' });
    },
    /**
     * Gets the user data from the database
     * @param req
     * @param res
     * @returns user data
     */
    getProfile: async (req, res) => {
        try {
            const userId = req.user.id;
            if (!userId) {
                res.status(400).json({ message: 'User ID not found' });
                return;
            }
            const db = db_1.client.db(dbName);
            const collection = db.collection('AuthUsers');
            const user = await collection.findOne({ _id: new mongodb_1.ObjectId(userId) });
            if (!user) {
                res.status(400).json({ message: 'User not found' });
                return;
            }
            res.status(200).json({
                email: user.email,
                name: user.name,
                phone: user.phone,
                role: user.role,
                id: user._id,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error during profile retrieval' });
        }
    },
};
