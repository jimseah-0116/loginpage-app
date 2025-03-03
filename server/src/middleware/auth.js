const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); // Proceed to the next middleware/controller
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = { authenticateToken };