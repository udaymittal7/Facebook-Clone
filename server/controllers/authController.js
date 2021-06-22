// packages
const crypto = require('crypto');

// Database
const User = require('../database/Users/User');

// utils
const Email = require('../utils/email');

// validator
const { loginValidator, registerValidator } = require('../validator/validator');

exports.registerUser = async (req, res) => {
  const { error } = registerValidator(req.body);

  if (error) {
    console.log(error.details);
    return res
      .status(400)
      .json({ message: 'Validation Error', error: error.details[0].message });
  }

  const { password, email, firstName, lastName, dob, gender } = req.body;

  try {
    let user = await User.userExist({ email });
    if (user) {
      return res.status(400).json({
        message: 'User with that email already exists',
      });
    }

    // Create user
    user = new User({
      email,
      password,
      firstName,
      lastName,
      dob,
      gender,
    });

    // Save user
    await user.save();

    await new Email(user).sendWelcome();

    const token = await user.generateAuthToken();

    return res.json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { error } = loginValidator(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: 'Validation Error', error: error.details[0].message });
  }

  const { email, password } = req.body;
  try {
    const user = await User.userExist({ email });
    if (!user)
      return res.status(400).json({
        message: 'User not found',
      });

    const isMatch = await user.correctPassword(password, user.password);

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
};

exports.forgotPassword = async (req, res) => {
  const email = req.body.email;

  // Get user
  const user = await User.userExist({ email });

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
  )}/resetPassword/${resetToken}`;

  try {
    const message = `Forgot your password? Submit a request with your new password at: ${resetURL}.`;
    await new Email(user, resetURL).sendPasswordReset(message);
    console.log('Email Sent');
    res.status(200).json({
      message: 'Token sent to your email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(err);

    return res.status(500).json({
      message: 'There was an error sending the email, please try again later',
      error: err.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  // get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

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
};

exports.updatePassword = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return res.status(401).json({ message: 'Your current password is wrong' });
  }

  user.password = req.body.newPassword;

  await user.save();

  const token = await user.generateAuthToken();

  res.status(200).json({ token, user });
};

exports.loggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      '-password -createdAt -updatedAt '
    );
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Server error',
    });
  }
};
