// Packages
const express = require('express');
const brcypt = require('bcryptjs');
const crypto = require('crypto');

// Databases
const User = require('../../database/Users/User');

// utils
const Email = require('../../utils/email');

// initializing express router
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { password, email } = req.body;

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
      email: email,
      password: hashedPassword,
    });

    // Save user
    await user.save();

    const token = await user.generateAuthToken();

    console.log(token);

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

    const token = await user.generateAuthToken();

    res.json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

// forgot password
router.patch('/forgotPassword', async (req, res) => {
  // Get user
  const user = await User.userExist(req.body.email);

  if (!user)
    return res.status(400).json({
      message: 'User not found',
    });

  // generate random reset token
  const resetToken = await user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  //send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/users/resetPassword/${resetToken}`;

  try {
    const message = `Forgot your password? Submit a request with your new password at: ${resetURL}.`;
    await new Email(user, resetURL).sendPasswordReset(message);

    res.status(200).json({
      message: 'Token sent to your email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
      message: 'There was an error sending the email, please try again later',
      error: err.message,
    });
  }
});

// reset password
router.post('/resetPassword/:token', async (req, res) => {
  // get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  console.log(hashedToken);

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  // if token has not expired, and there is a user, set the new password
  if (!user)
    return res.status(400).json({ message: 'Token is invalid or has expired' });

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  await user.save();

  // log the user in, send JWT
  const token = await user.generateAuthToken();

  res.status(200).json({ token, user });
});

module.exports = router;
