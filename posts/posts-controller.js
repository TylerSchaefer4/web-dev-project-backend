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

export default (app) => {
  app.post("/api/posts", createPost);
  app.get("/api/posts", findPosts);
  app.put("/api/posts/:pid", updatePost);
  app.delete("/api/posts/:pid", deletePost);
};
