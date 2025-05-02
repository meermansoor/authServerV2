import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';

export const authorize = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.header.authorization.startsWith('Bearer')) {

            token = req.headers.authorization.split(' ')[1];

            if (!token) {
                const error = new Error('Not authorized, no token');
                error.statusCode = 401;
                throw error;
            }

            const decoded = jwt.verify(token, JWT_SECRET);

            const user = await User.findById(decoded.userId).select('-password');

            if (!user) { return res.status(401).json({ message: 'Not authorized, user not found' }) };

            req.user = user;
            next();


        };

        const error = new Error('Not authorized');
        res.status(401).json({ message: 'Not authorized ', error: error.message });

    } catch (error) {
        next(error);

    }
};