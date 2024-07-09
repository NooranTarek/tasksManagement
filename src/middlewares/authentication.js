import jwt from 'jsonwebtoken';
import { User } from '../../database/models/user.js';

export const isAuthenticated = async (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        // Fetch citizen details from the database
        const user = await User.findById(req.user.user._id);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        if (!user.emailConfirmation) {
            return res.status(403).json({ message: "Your email is not confirmed." });
        }


        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

