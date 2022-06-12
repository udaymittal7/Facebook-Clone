const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'User is required'],
    },
    desc: {
      type: String,
      max: 500,
    },
    image: {
      type: String,
      default: '',
    },
    video: {
      type: String,
      default: '',
    },
    privacy: {
      type: String,
      enum: ['Only me', 'Public'],
      default: 'Public',
    },
    belongsTo: {
      type: String,
      enum: ['page', 'group', 'user'],
      default: 'user',
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
      },
    ],
    love: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('post', PostSchema);
