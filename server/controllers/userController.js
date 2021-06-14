// Databases
const User = require('../database/Users/User');

// helper function
const checkIfSentRequest = (user, id) => {
  return (
    user.sentRequests.filter((req) => req.user.toString() === id).length > 0
  );
};

const checkIfReceivedRequest = (user, id) => {
  return (
    user.receivedRequests.filter((req) => req.user.toString() === id).length > 0
  );
};

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server Error', err: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.userExist({ id: req.params.id });

    if (!user) return res.status(404).json({ message: 'No user with that Id' });

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server Error', err: err.message });
  }
};

// get user friends
exports.getFriends = async (req, res) => {
  try {
    const users = await User.findById(req.user.id).populate('friends');

    return res.status(200).json(users.friends);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server Error', err: err.message });
  }
};

// update user
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

// delete user
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

// send friend request
exports.sendFriendRequest = async (req, res) => {
  const friendId = req.params.id;

  const currentUser = await User.findById(req.user.id);

  try {
    // Get Recieving user info
    const receivingUser = await User.userExist({ id: friendId });

    // Check if currentUser exist
    if (!receivingUser) {
      return res
        .status(404)
        .json({ message: 'User with that id does not exist.' });
    }

    // Check if currentUser doesn't already have a pending request from receivingUser
    if (checkIfReceivedRequest(currentUser, friendId)) {
      return res
        .status(422)
        .json({ message: 'You already have a pending request from this user' });
    }

    // Check if requestingUser doesn't already have pending request from currentUser
    if (checkIfSentRequest(currentUser, friendId))
      return res
        .status(422)
        .json({ message: 'You already have sent a request to this user' });

    // Check if users aren't already friends
    const checkFriend = currentUser.friends.filter(
      (friend) => friend.toString() === friendId
    );

    if (checkFriend.length > 0) {
      return res
        .status(422)
        .json({ message: 'Already friends with this user' });
    }

    // Continue if no errors

    const currentUserData = {
      user: friendId,
      date: Date.now(),
    };

    const receivingUserData = {
      user: req.user.id,
      date: Date.now(),
    };

    // Updating currentUser's sentRequests
    currentUser.sentRequests.push(currentUserData);
    await currentUser.save();

    // Updating receivingUser's receivedRequests
    receivingUser.receivedRequests.push(receivingUserData);
    await receivingUser.save();

    // Send response back to client
    return res.status(200).json({
      message: 'Friend request sent!',
      user: currentUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server Error', err });
  }
};

// decline friend request
exports.declineFriendRequest = async (req, res) => {
  const friendId = req.params.id;

  const currentUser = await User.findById(req.user.id);

  try {
    // Get friend's info
    const friend = await User.userExist({ id: friendId });

    // Check if currentUser exist
    if (!friend) {
      return res
        .status(404)
        .json({ message: 'User with that id does not exist.' });
    }

    // checking if currentUser has a friend request from friend
    if (
      !checkIfReceivedRequest(currentUser, friendId) &&
      !checkIfSentRequest(friend, req.user.id)
    ) {
      return res
        .status(400)
        .json({ message: 'You do not have a friend request from this user' });
    }

    // Removing friendId from the currentUser's receivedRequests
    currentUser.receivedRequests = currentUser.receivedRequests.filter(
      (req) => req.user.toString() !== friendId
    );

    // Removing currentUser's Id from friend's sentRequests
    friend.sentRequests = friend.sentRequests.filter((req) => {
      req.user.toString() !== req.user.id;
    });

    // Continue if no errors

    // Updating currentUser's sentRequests
    await currentUser.save();

    // Updating receivingUser's receivedRequests
    await friend.save();

    // Send response back to client
    return res.status(200).json({
      message: 'Friend request declined!',
      user: currentUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server Error', err });
  }
};

// accept friend request
exports.acceptFriendRequest = async (req, res) => {
  const friendId = req.params.id;

  const currentUser = await User.findById(req.user.id);

  try {
    // Get friend's info
    const friend = await User.userExist({ id: friendId });

    // Check if currentUser exist
    if (!friend) {
      return res
        .status(404)
        .json({ message: 'User with that id does not exist.' });
    }

    // checking if currentUser has a friend request from friend
    if (
      !checkIfReceivedRequest(currentUser, friendId) &&
      !checkIfSentRequest(friend, req.user.id)
    ) {
      return res
        .status(400)
        .json({ message: 'You do not have a friend request from this user' });
    }

    // Removing friendId from the currentUser's receivedRequests
    currentUser.receivedRequests = currentUser.receivedRequests.filter(
      (req) => req.user.toString() !== friendId
    );

    // Removing currentUser's Id from friend's sentRequests
    friend.sentRequests = friend.sentRequests.filter((req) => {
      req.user.toString() !== req.user.id;
    });

    // Updating friends of both currentUser and friend
    currentUser.friends.push(friendId);
    friend.friends.push(req.user.id);

    // Continue if no errors

    // Updating currentUser's sentRequests
    await currentUser.save();

    // Updating receivingUser's receivedRequests
    await friend.save();

    // Send response back to client
    return res.status(200).json({
      message: 'Friend request Accepted!',
      user: currentUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server Error', err });
  }
};

// remove friend
exports.removeFriend = async (req, res) => {
  const friendId = req.params.id;

  const currentUser = await User.findById(req.user.id);

  try {
    // Get friend's info
    const friend = await User.userExist({ id: friendId });

    // Check if currentUser exist
    if (!friend) {
      return res
        .status(404)
        .json({ message: 'User with that id does not exist.' });
    }

    // Updating friends of both currentUser and friend
    currentUser.friends.pull(friendId);
    friend.friends.pull(req.user.id);

    // Continue if no errors

    // Updating currentUser's sentRequests
    await currentUser.save();

    // Updating receivingUser's receivedRequests
    await friend.save();

    // Send response back to client
    return res.status(200).json({
      message: 'Removed Friend!',
      user: currentUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server Error', err });
  }
};
