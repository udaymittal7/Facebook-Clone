// Packages
const express = require('express');

// Databases
const User = require('../../database/Users/User');

// middlewares
const auth = require('../../middleware/auth');

// initializing express router
const router = express.Router();

// update user
router.patch('updateUser/:id', auth, async (req, res) => {
  if (req.user.id === req.params.id) {
    const userFields = req.body;

    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: userFields,
        },
        { new: true }
      );

      if (!user) return res.status(404).json({ message: 'No user found' });

      res.status(200).json(user);
    } catch (error) {
      console.error(err);
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json({
      status: 'fail',
      message: 'You can update only your account',
    });
  }
});

// delete user
router.delete('/deleteUser/:id', auth, async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      await User.findByIdAndDelete();
      res.status(200);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json({
      status: 'fail',
      message: 'You can delete only your account',
    });
  }
});

module.exports = router;
