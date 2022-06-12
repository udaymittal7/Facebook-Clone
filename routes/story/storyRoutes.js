// Packages
const express = require('express');

// controller
const storyController = require('../../controllers/storyController');

// middlewares
const auth = require('../../middleware/auth');

// initializing express router
const router = express.Router();

// get user stories
router.get('/', auth, storyController.getUserStories);

// get timeline stories
router.get('/timeline', auth, storyController.getTimelineStories);

// create new story
router.post('/create', auth, storyController.createNewStory);

// delete story
router.delete('/delete/:id', auth, storyController.deleteStory);

// like unlike story
router.put('/:id/viewCount', auth, storyController.viewCount);

module.exports = router;
