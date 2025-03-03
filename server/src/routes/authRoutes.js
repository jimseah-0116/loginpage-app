const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// Public routes
router.post('/login', authController.login);

// Protected routes (require authentication)
router.get('/profile', authenticateToken, authController.getUserProfile);

module.exports = router;