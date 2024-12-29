const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to add a new user
router.post('/users', userController.addUser);

// Route to handle user login
router.post('/users/login', userController.loginUser);

// Route to get all users
router.get('/users', userController.getAllUsers);

// Route to get a user by ID
router.get('/users/:id', userController.getUserById);

// Route to update a user by ID
router.put('/users/:id', userController.updateUser);

// Route to delete a user by ID
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
