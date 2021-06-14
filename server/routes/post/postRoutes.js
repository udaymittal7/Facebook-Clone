// Packages
const express = require('express');

// controller
const postController = require('../../controllers/postController');

// middlewares
const auth = require('../../middleware/auth');

// initializing express router
const router = express.Router();

// create new post
router.post('/create', auth, postController.createNewPost);

// update post
router.patch('/update/:id', auth, postController.updatePost);

// delete post
router.delete('/delete/:id', auth, postController.deletePost);

// like unlike post
router.put('/:id/likeUnlike', auth, postController.likeUnlikePost);

// love unlove post
router.put('/:id/loveUnlove', auth, postController.loveUnlovePost);

// add comment
router.put('/:id/addComment', auth, postController.addComment);

// edit comment
router.put('/editComment/:commentId', auth, postController.editComment);

// like or unlike comment
router.put(
  '/likeUnlikeComment/:commentId',
  auth,
  postController.likeUnlikeComment
);

//add reply to comment
router.put('/addReply/:commentId', auth, postController.replyToComment);

//delete reply to comment
router.put(
  '/:commentId/deleteReply/:replyId',
  auth,
  postController.deleteReplyToComment
);

// delete comment
router.put('/:id/deleteComment/:commentId', auth, postController.deleteComment);

module.exports = router;
