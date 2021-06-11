const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  cover: {
    type: String,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  group_privacy: {
    type: String,
    enum: ['public', 'private'],
    default: 'public',
  },
  group_admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  members: {
    type: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'profile',
        },
        name: {
          type: String,
          required: true,
        },
        isAdmin: {
          type: Boolean,
          default: false,
        },
      },
    ],
    default: [],
  },
  requests: {
    type: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'user',
        },
        name: {
          type: String,
          required: true,
          minlength: 3,
        },
      },
    ],
    default: [],
  },
  posts: {
    type: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'post',
          required: true,
        },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model('group', groupSchema);
