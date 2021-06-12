// Packages
const express = require('express');

// Databases
const User = require('../../database/Users/User');

// Controller
const userController = require('../../controllers/userController');

// middlewares
const auth = require('../../middleware/auth');

// initializing express router
const router = express.Router();

// update user
router.patch('updateUser/:id', auth, userController.updateUser);

// delete user
router.delete('/deleteUser/:id', auth, userController.deleteUser);

module.exports = router;
