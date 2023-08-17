import postsModel from "./posts-model.js";
export const findPosts = () => postsModel.find();
export const findPostById = (pid) => postsModel.findById(pid);
export const createPost = (post) => postsModel.create(post);
export const deletePost = (pid) => postsModel.deleteOne({ _id: pid });
export const updatePost = (pid, post) =>
  postsModel.updateOne({ _id: pid }, { $set: post });
export const addCommentToPost = (pid, comment) =>
  postsModel.updateOne({ _id: pid }, { $push: { comments: comment } });

export const deleteCommentFromPost = (pid, commentId) =>
  postsModel.updateOne(
    { _id: pid },
    { $pull: { comments: { _id: commentId } } }
  );

export const findCommentsByPost = (pid) =>
  postsModel.findById(pid).then((post) => post.comments);
