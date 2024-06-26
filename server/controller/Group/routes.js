import * as dao from "../../model/Group/dao.js";

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
    try {
     
      const group = await dao.findGroupById(req.params.groupId);
      res.json(group);
    } catch (error) {
      res.status(500).json({ message: "Failed to find group", error: error.message });
    }
  };

  app.post('/api/join/:groupId', async (req, res) => {
    console.log(req.body)
    console.log(req.params)
    const { userId } = req.body;
    const { groupId } = req.params;
    console.log(userId)
    try {
      const updatedGroup = await dao.addMember(groupId, { userId, role: 'member' });
      res.status(200).json(updatedGroup);
      
    } catch (error) {
      res.status(500).json({ message: "Failed to add user to group", error: error.message });
    }
  });

  app.post("/api/groups", createGroup);
  app.delete("/api/groups/:groupId", deleteGroup);
  app.put("/api/groups/:groupId", updateGroup);
  app.get("/api/groups", findAllGroups);
  app.get("/api/groups/:groupId", findGroupById);
}
