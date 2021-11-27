const {Schema, model} = require("mongoose");

const profileSchema = new Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: String,
    isArtist: {
      type: Boolean,
      required: true,
    },
    artistName: {
      type: String,
    },
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Profile", profileSchema);
