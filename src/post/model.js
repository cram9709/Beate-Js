const {Schema, model} = require("mongoose");

const commentSchema = new Schema(
  {
    userName: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const postSchema = new Schema(
  {
    userName: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
    },
    comments: {
      type: [commentSchema],
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Post", postSchema);
