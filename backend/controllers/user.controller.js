const userService = require('../services/user.service');

const userController = {
    async register(req, res, next) {
        try {
            await userService.register(req.body);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            if (error.message === 'Username already exists') {
                res.status(400).json({ message: error.message });
            } else {
                next(error);
            }
        }
    },

    async login(req, res, next) {
        try {
            const result = await userService.login(req.body);
            res.json(result);
        } catch (error) {
            if (error.message === 'Invalid username or password') {
                res.status(401).json({ message: error.message });
            } else {
                next(error);
            }
        }
    },

    async getCurrentUser(req, res, next) {
        try {
            const user = await userService.getUserById(req.user.userId);
            res.json(user);
        } catch (error) {
            next(error);
        }
    },

    async updateCurrentUser(req, res, next) {
        try {
            const updatedUser = await userService.updateUser(req.user.userId, req.body);
            res.json(updatedUser);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = userController; 