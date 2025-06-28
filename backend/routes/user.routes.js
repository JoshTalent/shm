const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected user routes
router.get('/me', verifyToken, userController.getCurrentUser);
router.put('/me', verifyToken, userController.updateCurrentUser);

module.exports = router; 