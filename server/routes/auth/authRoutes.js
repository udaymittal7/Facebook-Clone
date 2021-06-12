// Packages
const express = require('express');

// controller
const authController = require('../../controllers/authController');

// middlewares
const auth = require('../../middleware/auth');

// initializing express router
const router = express.Router();

// Register
router.post('/register', authController.registerUser);

// Login
router.post('/login', authController.loginUser);

// forgot password
router.patch('/forgotPassword', authController.forgotPassword);

// reset password
router.patch('/resetPassword/:token', authController.resetPassword);

// update password
router.patch('/updateMyPassword', auth, authController.updatePassword);

// Get logged in user
router.get('/', auth, authController.loggedInUser);

module.exports = router;
