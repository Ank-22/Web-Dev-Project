import * as dao from "./dao.js";

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

  const findUserRole = async (req, res) => {
    const { userId } = req.params;
    const userRole = await dao.findUserRole(userId);
    res.json(userRole);
  };

  const signIn = async (req, res) => {
    const { username, password } = req.body;
    const user = await dao.signIn(username, password);
    res.json(user);
  };

  const signUp = async (req, res) => {
    const user = await dao.signUp(req.body);
    res.json(user);
  };

  app.post("/api/users", createUser);
  app.delete("/api/users/:userId", deleteUser);
  app.put("/api/users/:userId", updateUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.post("/api/users/addUserGroup", addUserGroup);
  app.put("/api/users/:userId/updatePassword", updatePassword);
  app.get("/api/users/:userId/findUserRole", findUserRole);
  app.post("/api/users/signIn", signIn);
  app.post("/api/users/signUp", signUp);
}
