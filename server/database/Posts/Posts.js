const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    desc: {
      type: String,
      max: 500,
    },
    body: {
      feelings: {
        type: String,
        trim: true,
      },
      with: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      at: {
        type: String,
        trim: true,
      },
      date: String,
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },
    privacy: {
      type: String,
      enum: ['Only me', 'Public'],
      default: 'Public',
    },
    belongsTo: {
      type: String,
      enum: ['page', 'group', 'user'],
    },
    reactions: [
      {
        like: [
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
        haha: [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'user',
            },
          },
        ],
        care: [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'user',
            },
          },
        ],
        wow: [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'user',
            },
          },
        ],
        sad: [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'user',
            },
          },
        ],
        angry: [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'user',
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('post', PostSchema);
