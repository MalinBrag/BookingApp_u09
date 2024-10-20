import jwt from 'jsonwebtoken';
import { CustomJwtPayload } from '../types/custom-jwt.payload';
import { Request, Response, NextFunction } from 'express';

export const verifyAdminToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as CustomJwtPayload;
        if (decoded.role !== 'Admin') {
            res.status(401).json({ message: 'Unauthorized: Not an admin' });
            return;
        }
        req.user = decoded;
        next();
    } catch (error) {  
        console.error('Token verification error: ', error);
        res.status(401).json({ message: 'Invalid or expired token' });
        return;
    }
}