// packages
const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, 'Please enter your name'],
      unique: true,
    },
    password: {
      type: String,
      require: [true, 'Please enter your password'],
      min: 8,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'profile',
    },
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
    expiresIn: 3600,
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

UserSchema.statics.userExist = async (email) => {
  const user = await User.findOne({ email });
  if (!user) return false;
  return user;
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
