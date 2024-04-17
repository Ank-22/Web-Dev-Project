import * as dao from "./dao.js";

export default function GroupItemRoutes(app) {
  const createGroupItem = async (req, res) => {
    const groupItem = await dao.createGroupItem(req.body);
    res.json(groupItem);
  };

  const deleteGroupItem = async (req, res) => {
    const status = await dao.deleteGroupItem(req.params.itemId);
    res.json(status);
  };

  const updateGroupItem = async (req, res) => {
    const { itemId } = req.params;
    const status = await dao.updateGroupItem(itemId, req.body);
    res.json(status);
  };

  const findAllGroupItems = async (req, res) => {
    const groupItems = await dao.findAllGroupItems();
    res.json(groupItems);
  };

  const findGroupItemById = async (req, res) => {
    const groupItem = await dao.findGroupItemById(req.params.itemId);
    res.json(groupItem);
  };

  app.post("/api/group-items", createGroupItem);
  app.delete("/api/group-items/:itemId", deleteGroupItem);
  app.put("/api/group-items/:itemId", updateGroupItem);
  app.get("/api/group-items", findAllGroupItems);
  app.get("/api/group-items/:itemId", findGroupItemById);
}
