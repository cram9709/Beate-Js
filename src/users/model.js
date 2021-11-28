const {Schema, model} = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    followers: {
      type: [Schema.ObjectId],
      ref: 'User',
    },
    following: {
      type: [Schema.ObjectId],
      ref: 'User',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model('User', userSchema);
