// Databases
const Story = require('../database/Stories/Story');
const User = require('../database/Users/User');

// get timeline stories
exports.getTimelineStories = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);

    const userStories = await Story.find({ user: req.user.id });
    const friendStories = await Promise.all(
      currentUser.friends.map(async (friend) => {
        return await Story.find({ user: friend });
      })
    );

    res.status(200).json(userStories.concat(...friendStories));
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        message: 'No story with that ID',
      });
    }
    return res.status(500).json({
      message: 'Server Error',
      err: err.message,
    });
  }
};

// get user stories
exports.getUserStories = async (req, res) => {
  try {
    const userStories = await Story.find({ user: req.user.id });

    res.status(200).json(userStories);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        message: 'No story with that ID',
      });
    }
    return res.status(500).json({
      message: 'Server Error',
      err: err.message,
    });
  }
};

// create new story
exports.createNewStory = async (req, res) => {
  const userId = req.user.id;
  const { image, video, privacy } = req.body;

  const media = image ? image : video;

  try {
    const newStory = new Story({
      user: userId,
      media,
      privacy,
    });

    const story = await newStory.save();
    return res.status(200).json(story);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server Error', err });
  }
};

// delete story
exports.deleteStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        message: 'No story with that ID',
      });
    }

    if (story._id.toString() === req.params.id) {
      await story.remove();
      res.status(200).json({
        message: 'Your story has been deleted',
      });
    } else {
      return res.status(401).json({
        message: 'You can delete only your story',
      });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        message: 'No story with that ID',
      });
    }
    return res.status(500).json({
      message: 'Server Error',
      err: err.message,
    });
  }
};

exports.viewCount = async (req, res) => {
  try {
    let story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        message: 'No story with that ID',
      });
    }

    story.viewCount = story.viewCount + 1;

    story = await story.save();

    res.status(200).json(story.viewCount);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        message: 'No story with that ID',
      });
    }
    return res.status(500).json({
      message: 'Server Error',
      err: err.message,
    });
  }
};
