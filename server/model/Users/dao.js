import User from "./model.js";

export const createUser = (user) => {
  delete user._id;
  User.create(user);
};

export const deleteUser = (userId) => User.deleteOne({ _id: userId });

export const updateUser = (userId, userData) =>
  User.updateOne({ _id: userId }, { $set: userData });

export const findAllUsers = () => User.find();

export const findUserById = (userId) => User.findById(userId);

export const findUserByUsername = (username) =>
  User.findOne({ username: username });

export const addUserGroup = (userId, groupId, role) =>
  User.updateOne(
    { _id: userId },
    { $push: { groups: { group_id: groupId, role: role } } }
  );

export const updatePassword = (userId, newPassword) =>
  User.updateOne({ _id: userId }, { $set: { password: newPassword } });

export const findUsersByRole = (role) => User.find({ role: role });

export const signIn = (username, password) =>
  User.findOne({ username: username, password: password });

export const signUp = (user) => User.create(user);
