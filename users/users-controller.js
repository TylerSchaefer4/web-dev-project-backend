import * as usersDao from "./users-dao.js";
const UserController = (app) => {
  app.get("/api/users", findAllUsers); // changed this
  app.get("/api/users/:uid", findUserById);
  app.post("/api/users", createUser);
  app.delete("/api/users/:uid", deleteUser);
  app.put("/api/users/:uid", updateUser);
  app.post("/api/users/:uid/follow", followUser);
  app.post("/api/users/:uid/unfollow", unfollowUser);
  app.get("/api/users/:uid/followers", getFollowers);
  app.get("/api/users/:uid/following", getFollowing);
};
const findUsers = (req, res) => {
  const type = req.query.type;
  if (type) {
    const usersOfType = users.filter((u) => u.type === type);
    res.json(usersOfType);
    return;
  }
  res.json(users);
};

const findAllUsers = async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  if (username && password) {
    const user = await usersDao.findUserByCredentials(username, password);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } else if (username) {
    const user = await usersDao.findUserByUsername(username);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } else {
    const users = await usersDao.findAllUsers();
    res.json(users);
  }
};

const findUserById = async (req, res) => {
  const id = req.params.id;
  const user = await usersDao.findUserById(id);
  res.json(user);
};
const createUser = async (req, res) => {
  const newUser = await usersDao.createUser(req.body);
  res.json(newUser);
};
const deleteUser = async (req, res) => {
  const userId = req.params["uid"];
  const status = await usersDao.deleteUser(userId);
  res.sendStatus(status);
};

const updateUser = async (req, res) => {
  const id = req.params["uid"];
  const status = await usersDao.updateUser(id, req.body);
  const user = await usersDao.findUserById(id);
  req.session["currentUser"] = user;
  res.json(status);
};

const followUser = async (req, res) => {
  const userId = req.session["currentUser"]._id;
  const userToFollowId = req.params["uid"];

  const updatedUser = await usersDao.followUser(userId, userToFollowId);
  await usersDao.addFollower(userToFollowId, userId);

  req.session["currentUser"] = updatedUser;
  res.json(updatedUser);
};

const unfollowUser = async (req, res) => {
  const userId = req.session["currentUser"]._id;
  const userToUnfollowId = req.params["uid"];

  const updatedUser = await usersDao.unfollowUser(userId, userToUnfollowId);
  await usersDao.removeFollower(userToUnfollowId, userId);

  req.session["currentUser"] = updatedUser;
  res.json(updatedUser);
};
const getFollowers = async (req, res) => {
  const userId = req.params["uid"];
  const followers = await usersDao.findFollowersByUserId(userId);
  res.json(followers);
};

const getFollowing = async (req, res) => {
  const userId = req.params["uid"];
  const following = await usersDao.findFollowingByUserId(userId);
  res.json(following);
};

export default UserController;
