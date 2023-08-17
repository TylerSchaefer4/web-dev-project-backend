import mongoose from "mongoose";
const schema = mongoose.Schema(
  {
    post: String,
    likes: Number,
    liked: Boolean,
    dislikes: Number,
    disliked: Boolean,
    image: String,
    title: String,
    topic: String,
    userName: String,
    time: String,
  },
  { collection: "posts" }
);
export default schema;
