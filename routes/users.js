const express = require('express');
const userController = require('../controllers/UserController');  // Correct path to user controller

const router = express.Router();

// Define all routes under /api/v1/users
router.get('/users', userController.getUsers);  // Get all users
router.get('/users/:userId', userController.getUserById);  // Get a user by ID
router.post('/users', userController.createUser);  // Create a new user
router.put('/users/:userId', userController.updateUser);  // Update an existing user
router.delete('/users/:userId', userController.deleteUser);  // Delete a user by ID

module.exports = router;
