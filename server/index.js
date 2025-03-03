const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./src/routes/authRoutes');

// Import database configuration
const { testConnection } = require('./src/models/config');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Basic route for testing
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend server is running!' });
});

// Set port and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

testConnection();