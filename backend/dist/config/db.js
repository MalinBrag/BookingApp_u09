"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.connect_db = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.MONGO_URI || '';
const client = new mongodb_1.MongoClient(uri);
exports.client = client;
/**
 * Connects to the database
 */
const connect_db = async () => {
    try {
        await client.connect();
        console.log('Connected to database');
    }
    catch (error) {
        console.error('Failed to connect', error);
        process.exit(1);
    }
};
exports.connect_db = connect_db;
