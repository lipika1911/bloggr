import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required!'
            });
        }

        const isUser = await User.findOne({ email });
        if (isUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists!'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await user.save();

        return res.status(201).json({
            success: true,
            message: 'Registration Successful!'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
