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

// send friend request
router.patch('/sendFriendRequest/:id', auth, userController.sendFriendRequest);

// decline friend request
router.patch(
  '/declineFriendRequest/:id',
  auth,
  userController.declineFriendRequest
);

// accept friend request
router.patch(
  '/acceptFriendRequest/:id',
  auth,
  userController.acceptFriendRequest
);

// remove friend
router.patch('/removeFriend/:id', auth, userController.removeFriend);

module.exports = router;
