// packages
const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter your username'],
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: [true, 'Please enter your username'],
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: [true, 'Please enter your name'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      min: 8,
    },
    dob: {
      type: Date,
      required: [true, 'Please enter your date of birth'],
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
    profilePicture: {
      type: String,
    },
    coverPicture: {
      type: String,
    },
    bio: {
      type: String,
      max: 50,
      trim: true,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    relationship: {
      type: String,
      enum: ['Single', 'Relationship', 'Complicated', 'Married'],
    },
    education: {
      university: {
        type: String,
      },
      highSchool: {
        type: String,
      },
    },
    work: {
      title: {
        type: String,
        require: true,
      },
      company: {
        type: String,
        require: true,
      },
    },

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
    sentRequests: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    receivedRequests: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    notifications: [
      {
        post: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'post',
        },
        friend: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
        content: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        seen: {
          type: Boolean,
          default: false,
        },
      },
    ],
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.generateAuthToken = async function () {
  const payload = {
    user: {
      id: this.id.toString(),
    },
  };
  return await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 36000,
  });
};

UserSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

UserSchema.statics.userExist = async (type) => {
  const { email, id } = type;
  let user;
  if (email) user = await User.findOne({ email });
  else if (id) user = await User.findById(id);
  if (!user) return false;
  return user;
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
