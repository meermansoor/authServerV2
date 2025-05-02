import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';

export const authorize = async (req, res, next) => {
    try {
        let token;

        // Check if Authorization header exists and starts with 'Bearer'
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else {
            return res.status(401).json({ message: 'Not authorized: Token missing' });
        }

        console.log(`Token: ${token}`);

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Check if user exists
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }

        // Attach user to request
        req.user = user;
        next();

    } catch (error) {
        console.error('Authorization error:', error.message);
        return res.status(401).json({ message: 'Not authorized', error: error.message });
    }
};
