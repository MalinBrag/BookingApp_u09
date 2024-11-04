"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdminToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Verifies the token and checks if the user is an admin
 * @param req
 * @param res
 * @param next
 * @returns decoded token
 */
const verifyAdminToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'Admin') {
            res.status(401).json({ message: 'Unauthorized: Not an admin' });
            return;
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error('Token verification error: ', error);
        res.status(401).json({ message: 'Invalid or expired token' });
        return;
    }
};
exports.verifyAdminToken = verifyAdminToken;
