"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.connect_db = void 0;
const mongodb_1 = require("mongodb");
const uri = process.env.MONGO_URI || '';
const client = new mongodb_1.MongoClient(uri);
exports.client = client;
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
