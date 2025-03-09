const UserService = require('../services/UserService');  // Import the user service

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await UserService.getAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await UserService.getById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const newUser = await UserService.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update an existing user
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await UserService.update(req.params.userId, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await UserService.delete(req.params.userId);
        if (!deleted) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
