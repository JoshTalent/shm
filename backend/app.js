const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const protectedRoutes = require('./routes/protected.routes');
const deviceRoutes = require('./routes/device.routes');
const errorHandler = require('./middlewares/error.middleware');
const { verifyToken } = require('./middlewares/auth.middleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Public routes (no authentication required)
app.use('/api/auth', userRoutes);

// Protected routes (authentication required)
app.use('/api/protected', verifyToken, protectedRoutes);
app.use('/api/devices', deviceRoutes);

// Basic route for testing
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling
app.use(errorHandler);

module.exports = app; 