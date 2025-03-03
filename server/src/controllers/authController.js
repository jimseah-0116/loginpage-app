const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Login controller
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Since we're using plain text passwords in our dummy data for now
        // In production, you would use: const validPassword = await user.checkPassword(password);
        const validPassword = password === user.password;

        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Create and assign token
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            token,
            user: {
                id: user.id,
                username: user.username
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'username', 'nric', 'first_name', 'last_name', 'date_of_birth', 'address', 'gender']
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};