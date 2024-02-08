const User = require('../models/User');

// Register a new user
async function registerUser(req, res) {
  try {
    const { error } = User.validateUser(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password // Include the password field
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Login user
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add your login logic here, e.g., compare passwords
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get user profile
async function getMyProfile(req, res) {
  try {
    const userId = req.user.id; // Assuming you have authentication middleware that sets req.user.id

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add your get profile logic here
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getMyProfile
};