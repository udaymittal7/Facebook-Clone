const mongoose = require('mongoose');

const StorySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'User is required'],
    },
    media: {
      type: String,
      default: '',
      required: [true, 'A story must have either an image or video'],
    },
    privacy: {
      type: String,
      enum: ['Only me', 'Public'],
      default: 'Public',
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('story', StorySchema);
