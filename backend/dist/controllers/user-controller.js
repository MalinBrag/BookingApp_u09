"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const mongodb_1 = require("mongodb");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client = new mongodb_1.MongoClient(process.env.MONGO_URI || '');
const dbName = 'u09';
exports.userController = {
    registerUser: async (req, res) => {
        await client.connect();
        const { name, email, password, password_confirmation } = req.body;
        try {
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            const db = client.db(dbName);
            const collection = db.collection('AuthUsers');
            const existingUser = await collection.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User email already exists' });
            }
            await collection.insertOne({ name, email, password: hashedPassword });
            return res.status(201).json({ message: 'User registered successfully' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error during registration' });
        }
    },
    signInUser: async (req, res) => {
        await client.connect();
        const { email, password } = req.body;
        try {
            const db = client.db(dbName);
            const collection = db.collection('AuthUsers');
            const user = await collection.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }
            const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            return res.json({
                message: 'User signed in successfully',
                token,
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error during sign in' });
        }
    },
};
