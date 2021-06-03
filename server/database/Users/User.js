const mongoose = require('mongoose');

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
  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const payload = {
    user: {
      id: user.id,
    },
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 360000,
  });
};

UserSchema.statics.userExist = async (email) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error('User with that email does not exist.');
  return true;
};

export const UserModel = mongoose.model('user', UserSchema);
