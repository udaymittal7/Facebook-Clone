const mongoose = require('mongoose');

const profileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    firstName: {
      type: String,
      require: [true, 'Please enter your username'],
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      require: [true, 'Please enter your username'],
      min: 3,
      max: 20,
    },
    profilePicture: {
      type: String,
    },
    coverPicture: {
      type: String,
    },
    dob: {
      type: Date,
      required: [true, 'Please enter your date of birth'],
    },
    bio: {
      type: String,
      max: 50,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
    contactNumber: [
      {
        type: String,
        default: '',
      },
    ],
    lives: {
      type: String,
      default: '',
    },
    from: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    friends: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
      },
    ],
    relationship: {
      type: String,
      enum: ['Single', 'Relationship', 'Complicated', 'Married'],
    },
    education: [
      {
        university: {
          type: String,
        },
        highSchool: {
          type: String,
        },
      },
    ],
    work: [
      {
        title: {
          type: String,
          require: true,
        },
        company: {
          type: String,
          require: true,
        },
      },
    ],
    socialHandles: {
      facebook: String,
      instagram: String,
      twitter: String,
      linkedIn: String,
    },
    movies: [
      {
        type: String,
      },
    ],
    books: [
      {
        type: String,
      },
    ],
    music: [
      {
        type: String,
      },
    ],
    shows: [
      {
        type: String,
      },
    ],
    hobbies: [
      {
        type: String,
      },
    ],
    saved: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'post',
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('profile', profileSchema);
