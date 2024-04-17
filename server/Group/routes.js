import * as dao from "./dao.js";

export default function GroupRoutes(app) {
  const createGroup = async (req, res) => {
    const group = await dao.createGroup(req.body);
    res.json(group);
  };

  const deleteGroup = async (req, res) => {
    const status = await dao.deleteGroup(req.params.groupId);
    res.json(status);
  };

  const updateGroup = async (req, res) => {
    const { groupId } = req.params;
    const status = await dao.updateGroup(groupId, req.body);
    res.json(status);
  };

  const findAllGroups = async (req, res) => {
    const groups = await dao.findAllGroups();
    res.json(groups);
  };

  const findGroupById = async (req, res) => {
    const group = await dao.findGroupById(req.params.groupId);
    res.json(group);
  };

  app.post("/api/groups", createGroup);
  app.delete("/api/groups/:groupId", deleteGroup);
  app.put("/api/groups/:groupId", updateGroup);
  app.get("/api/groups", findAllGroups);
  app.get("/api/groups/:groupId", findGroupById);
}
