import * as dao from "./dao.js";
import User from "../Users/model.js"

let currentUser = null;
export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    res.json(status);
  };

  const findAllUsers = async (req, res) => {
    const { role } = req.query;
    if (role) {
      if (role === "member") {
        const users = await dao.findAllUsers();
        res.json(users);
        return;
      } else {
        const users = await dao.findUsersByRole(role);
        res.json(users);
        return;
      }
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const addUserGroup = async (req, res) => {
    const { userId, groupId, role } = req.body;
    const status = await dao.addUserGroup(userId, groupId, role);
    res.json(status);
  };

  const updatePassword = async (req, res) => {
    const { userId } = req.params;
    const { newPassword } = req.body;
    const status = await dao.updatePassword(userId, newPassword);
    res.json(status);
  };


  const signIn = async (req, res) => {
    try {
      const {username, password} = req.body;
      const user = await dao.signIn(username, password);
      if (user) {
        currentUser = user;
        res.status(200).json(currentUser);
      }
      else {
        res.status(404).json({message: "User not found"});
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const signUp = async (req, res) => {
    try {
      const existingUser = await User.findOne({ username: req.body.username });
      if (existingUser) {
        res.status(400).json({ message: "Username already taken" });
      }
      else {
        const newUser = await dao.signUp(req.body);
        currentUser = newUser;
        res.status(200).json(newUser);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const profile = (req, res) => {
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };
  const signout = (req, res) => {
    req.session.destroy();
    currentUser = null;
    res.sendStatus(200);
  };

  app.post("/api/users", createUser);
  app.delete("/api/users/:userId", deleteUser);
  app.put("/api/users/:userId", updateUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.post("/api/users/addUserGroup", addUserGroup);
  app.put("/api/users/:userId/updatePassword", updatePassword);
  app.post("/api/users/signIn", signIn);
  app.post("/api/users/signUp", signUp);
  app.post("/api/users/profile", profile);
  app.post("/api/users/signout", signout);

}
