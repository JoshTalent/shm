const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { JWT_SECRET } = require('../config/app.config');

class UserService {
    async register(userData) {
        const { user_username, user_usertype, user_password } = userData;
        
        // Check if user exists
        const existingUser = await User.findByUsername(user_username);
        if (existingUser) {
            throw new Error('Username already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(user_password, 10);

        // Create user
        return await User.create({
            user_username,
            user_usertype,
            user_password: hashedPassword
        });
    }

    async login(credentials) {
        const { user_username, user_password } = credentials;

        // Find user
        const user = await User.findByUsername(user_username);
        if (!user) {
            throw new Error('Invalid username or password');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(user_password, user.user_password);
        if (!isPasswordValid) {
            throw new Error('Invalid username or password');
        }

        // Generate token
        const token = jwt.sign(
            {
                userId: user.user_id,
                user_username: user.user_username,
                user_usertype: user.user_usertype
            },
            JWT_SECRET
        );

        return { token };
    }

    async getUserById(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        
        // Remove sensitive data
        delete user.user_password;
        return user;
    }

    async updateUser(userId, updateData) {
        // Don't allow password update through this method
        delete updateData.user_password;
        
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const updatedUser = await User.update(userId, updateData);
        delete updatedUser.user_password;
        return updatedUser;
    }
}

module.exports = new UserService(); 