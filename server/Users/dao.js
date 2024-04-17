import User from "./schema.js";

export const createUser = (user) => User.create(user);

export const deleteUser = (userId) => User.deleteOne({ _id: userId });

export const updateUser = (userId, userData) =>
  User.updateOne({ _id: userId }, { $set: userData });

export const findAllUsers = () => User.find();

export const findUserById = (userId) => User.findById(userId);

export const addUserGroup = (userId, groupId, role) =>
  User.updateOne(
    { _id: userId },
    { $push: { groups: { group_id: groupId, role: role } } }
  );

export const updatePassword = (userId, newPassword) =>
  User.updateOne({ _id: userId }, { $set: { Password: newPassword } });

export const findUserRole = (userId) => User.findById(userId, { role: 1 });

export const signIn = (username, password) =>
  User.findOne({ username: username, Password: password });

export const signUp = (user) => User.create(user);
