import * as postsDao from "./posts-dao.js";

const createPost = async (req, res) => {
  const newPost = req.body;
  newPost.likes = 0;
  newPost.liked = false;
  newPost.handle = req.body.handle;
  newPost.username = req.body.username;
  const insertedTuit = await postsDao.createPost(newPost);
  res.json(insertedTuit);
};
const findPosts = async (req, res) => {
  const posts = await postsDao.findPosts();
  res.json(posts);
};

const updatePost = async (req, res) => {
  const postId = req.params.pid;
  const updates = req.body;
  const status = await postsDao.updatePost(postId, updates);
  res.json(status);
};
const deletePost = async (req, res) => {
  const postIdToDelete = req.params.pid;
  const status = await postsDao.deletePost(postIdToDelete);
  res.json(status);
};

const addCommentToPost = async (req, res) => {
  const postId = req.params.pid;
  const newComment = req.body;
  const status = await postsDao.addCommentToPost(postId, newComment);
  res.json(status);
};

const deleteCommentFromPost = async (req, res) => {
  const postId = req.params.pid;
  const commentId = req.params.cid;
  const status = await postsDao.deleteCommentFromPost(postId, commentId);
  res.json(status);
};

const findCommentsByPost = async (req, res) => {
  const postId = req.params.pid;
  const comments = await postsDao.findCommentsByPost(postId);
  res.json(comments);
};

export default (app) => {
  app.post("/api/posts", createPost);
  app.get("/api/posts", findPosts);
  app.put("/api/posts/:pid", updatePost);
  app.delete("/api/posts/:pid", deletePost);
  app.post("/api/posts/:pid/comments", addCommentToPost);
  app.delete("/api/posts/:pid/comments/:cid", deleteCommentFromPost);
  app.get("/api/posts/:pid/comments", findCommentsByPost);
};
