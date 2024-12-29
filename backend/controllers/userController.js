const User = require('../models/userModels');
const bcrypt = require('bcrypt'); // Use bcrypt for password hashing

// Controller to add a new user
exports.addUser = async (req, res) => {
    const userData = req.body;

    // Validate that the required fields are present
    if (!userData.user || !userData.email || !userData.department_id || !userData.password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Hash the password before storing it
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;

        // Create the user entry in the database
        User.create(userData, (err, result) => {
            if (err) {
                console.error('Error adding user:', err);
                return res.status(500).json({ message: 'Error adding user', error: err });
            }
            res.status(200).json({ message: 'User added successfully!' });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ message: 'Error hashing password', error });
    }
};

exports.loginUser = (req, res) => {
    const { user, password } = req.body;

    User.getByUsername(user, async (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ message: 'Error fetching user', error: err });
        }
        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const storedPassword = results[0].password;
        const isPasswordValid = await bcrypt.compare(password, storedPassword);

        if (isPasswordValid) {
            res.status(200).json({ message: 'Login successful', user_id: results[0].id });
        } else {
            res.status(400).json({ message: 'Invalid username or password' });
        }
    });
};


// Controller to fetch all users
exports.getAllUsers = (req, res) => {
    User.getAll((err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ message: 'Error fetching users', error: err });
        }
        res.json(results);
    });
};

// Controller to fetch a single user by ID
exports.getUserById = (req, res) => {
    const userId = req.params.id;
    User.getById(userId, (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ message: 'Error fetching user', error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(results[0]);
    });
};

// Controller to update an existing user
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const userData = req.body;

    // Ensure all fields to be updated are present
    User.update(userId, userData, (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).json({ message: 'Error updating user', error: err });
        }
        res.status(200).json({ message: 'User updated successfully!' });
    });
};

// Controller to delete a user by ID
exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    User.delete(userId, (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ message: 'Error deleting user', error: err });
        }
        res.status(204).json({ message: 'User deleted successfully!' });
    });
};
