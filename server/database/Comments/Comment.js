const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      requried: true,
    },
    content: {
      type: String,
      required: true,
      minlength: 5,
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'post',
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    replies: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
          required: true,
        },
        edited: String,
        content: String,
        likes: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('comment', commentSchema);
