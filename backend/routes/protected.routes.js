const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');

// Protected route example
router.get('/profile', verifyToken, (req, res) => {
    res.json({
        message: 'Protected data retrieved successfully',
        user: {
            userId: req.user.userId,
            username: req.user.user_username,
            userType: req.user.user_usertype
        }
    });
});

module.exports = router; 