const express = require('express');
const brcypt = require('bcryptjs');
const User = require('../../database/Users/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    let user = await User.userExist(email);
    if (user) {
      return res.status(400).json({
        message: 'User with that email already exists',
      });
    }
    // Generate new password
    const salt = await brcypt.genSalt(10);
    const hashedPassword = await brcypt.hash(password, salt);

    // Create user
    user = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    // Save user
    await user.save();

    const token = user.generateAuthToken();

    return res.json({ token, user });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.userExist(email);
    if (!user)
      return res.status(400).json({
        message: 'User not found',
      });

    const isMatch = await brcypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Wrong password',
      });
    }

    const token = user.generateAuthToken();

    res.json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

// forgot password
router.post('/forgotPassword');

module.exports = router;
