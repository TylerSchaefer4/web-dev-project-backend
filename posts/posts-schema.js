import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: String,
  author: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const postSchema = new mongoose.Schema(
  {
    post: String,
    likes: {
      type: Number,
      default: 0,
    },
    liked: {
      type: Boolean,
      default: false,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    disliked: {
      type: Boolean,
      default: false,
    },
    image: String,
    title: String,
    topic: String,
    userName: String,
    timestamp: {
      type: Date,
      default: Date.now,
    },
    comments: [commentSchema],
  },
  { collection: "posts" }
);

export default postSchema;
