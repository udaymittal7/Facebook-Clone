// Databases
const User = require('../database/Users/User');

exports.updateUser = async (req, res) => {
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
};

exports.deleteUser = async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(204);
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
};
