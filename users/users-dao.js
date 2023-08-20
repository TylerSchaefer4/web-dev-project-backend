import usersModel from "./users-model.js";

export const findAllUsers = () => usersModel.find();
export const findUserById = (id) => usersModel.findById(id);
export const findUserByUsername = (username) =>
  usersModel.findOne({ username });
export const findUserByCredentials = (username, password) =>
  usersModel.findOne({ username, password });
export const createUser = (user) => usersModel.create(user);
export const updateUser = (id, user) =>
  usersModel.updateOne({ _id: id }, { $set: user });
export const deleteUser = (id) => usersModel.deleteOne({ _id: id });
// Follow a user
export const followUser = (userId, userToFollowId) =>
  usersModel.findByIdAndUpdate(
    userId,
    { $addToSet: { following: userToFollowId } },
    { new: true }
  );

// Unfollow a user
export const unfollowUser = (userId, userToUnfollowId) =>
  usersModel.findByIdAndUpdate(
    userId,
    { $pull: { following: userToUnfollowId } },
    { new: true }
  );

// Add a follower
export const addFollower = (userId, followerId) =>
  usersModel.findByIdAndUpdate(
    userId,
    { $addToSet: { followers: followerId } },
    { new: true }
  );

// Remove a follower
export const removeFollower = (userId, followerId) =>
  usersModel.findByIdAndUpdate(
    userId,
    { $pull: { followers: followerId } },
    { new: true }
  );

export const findFollowersByUserId = (userId) => {
  return usersModel
    .findById(userId)
    .populate("followers", "username") // This populates the followers array with the username of each follower
    .then((user) => user.followers);
};

export const findFollowingByUserId = (userId) => {
  return usersModel
    .findById(userId)
    .populate("following", "username") // This populates the following array with the username of each user being followed
    .then((user) => user.following);
};
