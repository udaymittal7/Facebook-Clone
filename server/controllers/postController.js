// Databases
const Post = require('../database/Posts/Posts');
const Comment = require('../database/Comments/Comment');

// create new post
exports.createNewPost = async (req, res) => {
  const userId = req.user.id;
  const {
    desc,
    privacy,
    belongsTo,
    feelings,
    with: person,
    at,
    date,
  } = req.body;

  try {
    const newPost = new Post({
      user: userId,
      desc,
      image: req.file || '',
      video: req.file || '  ',
      privacy,
      belongsTo,
      body: {
        feelings: feelings || '',
        with: person || [],
        at: at || '',
        date: date || '',
      },
    });

    const post = await newPost.save();
    return res.status(200).json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server Error', err });
  }
};

// update post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: 'No post with that ID',
      });
    }

    if (post.user.toString() === req.user.id) {
      await Post.updateOne({ _id: req.params.id }, { $set: req.body });
      res.status(200).json({
        message: 'Your post has been updated',
        post,
      });
    } else {
      return res.status(401).json({
        message: 'You can update only your post',
      });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        message: 'No post with that ID',
      });
    }
    return res.status(500).json({
      message: 'Server Error',
    });
  }
};

// delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: 'No post with that ID',
      });
    }

    if (post.user.toString() === req.user.id) {
      await post.remove();
      res.status(200).json({
        message: 'Your post has been deleted',
      });
    } else {
      return res.status(401).json({
        message: 'You can delete only your post',
      });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        message: 'No post with that ID',
      });
    }
    return res.status(500).json({
      message: 'Server Error',
    });
  }
};

// Like and Dislike a post
exports.likeUnlikePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: 'No post with that ID',
      });
    }

    post.love = post.love.filter(
      (love) => love.user.toString() !== req.user.id
    );

    if (!post.likes.find((like) => like.user.toString() === req.user.id)) {
      post.likes.unshift({ user: req.user.id });
    } else {
      post.likes = post.likes.filter(
        (like) => like.user.toString() !== req.user.id
      );
    }

    post = await post.save();

    return res.status(200).json(post.likes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Server Error',
    });
  }
};

// Love or unlove react on a post
exports.loveUnlovePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: 'No post with that ID',
      });
    }

    post.likes = post.likes.filter(
      (like) => like.user.toString() !== req.user.id
    );

    if (!post.love.find((item) => item.user.toString() === req.user.id)) {
      post.love.unshift({ user: req.user.id });
    } else {
      post.love = post.love.filter(
        (item) => item.user.toString() !== req.user.id
      );
    }

    post = await post.save();

    return res.status(200).json(post.love);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Server Error',
    });
  }
};

// comment on post
exports.addComment = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'No post with that Id' });
    }

    const newComment = new Comment({
      content: req.body.content,
      user: req.user.id,
      postId: req.params.id,
    });

    const comment = await newComment.save();

    post.comments.unshift(comment.id);

    post = await post.save();

    return res.status(200).json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message: 'Server Error',
    });
  }
};

// edit comment on a post
exports.editComment = async (req, res) => {
  try {
    const { content } = req.body;

    let comment = await Comment.findById(req.params.commentId);

    if (req.user.id !== comment.user.toString()) {
      return res
        .status(500)
        .json({ message: 'You can only edit your comment' });
    }

    if (!comment) {
      return res
        .status(404)
        .json({ message: 'Comment with that ID doest not exist' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: 'You can edit only your comments' });
    }

    if (!content) {
      return res
        .status(500)
        .json({ message: 'Comment content can not be empty' });
    }

    comment.content = content;

    comment = await comment.save();

    return res
      .status(200)
      .json({ message: 'Post successfully updated', comment });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server Error', err: err.message });
  }
};

// like or unlike a comment
exports.likeUnlikeComment = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({
        message: 'No comment with that ID',
      });
    }

    if (!comment.likes.find((like) => like.user.toString() === req.user.id)) {
      comment.likes.unshift({ user: req.user.id });
    } else {
      comment.likes = comment.likes.filter(
        (like) => like.user.toString() !== req.user.id
      );
    }

    comment = await comment.save();

    return res.status(200).json(comment);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Server Error',
      err: err.message,
    });
  }
};

// reply to comment
exports.replyToComment = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({
        message: 'No comment with that ID',
      });
    }

    const reply = {
      user: req.user.id,
      content: req.body.content,
    };

    comment.replies.unshift(reply);

    comment = await comment.save();

    return res.status(200).json(comment);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message: 'Server Error',
    });
  }
};

// delete reply to comment
exports.deleteReplyToComment = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        message: 'No comment with that ID',
      });
    }

    if (req.user.id !== comment.user.toString()) {
      return res
        .status(500)
        .json({ message: 'You can only delete your replies' });
    }

    comment.replies = comment.replies.filter((reply) => {
      reply._id.toString() !== req.params.requestId;
    });

    comment = await comment.save();

    return res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server error', err: err.message });
  }
};

// delete comment
exports.deleteComment = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res
        .status(404)
        .json({ message: 'Comment with that ID doest not exist' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: 'You can delete only your comments' });
    }

    post.comments.pull(req.params.commentId);

    await comment.remove();
    post = await post.save();

    return res.status(200).json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message: 'Server Error',
    });
  }
};
