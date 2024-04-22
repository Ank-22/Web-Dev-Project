import express from 'express';
import * as dao from './dao.js';

const router = express.Router();

router.post('/api/groups', async (req, res) => {
  try {
    const group = await dao.createGroup(req.body);
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: "Failed to create group", error: error.message });
  }
});

router.get('/api/groups', async (req, res) => {
  try {
    const groups = await dao.findAllGroups();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve groups", error: error.message });
  }
});

router.get('/api/groups/:groupId', async (req, res) => {
  try {
    const group = await dao.findGroupById(req.params.groupId);
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: "Failed to find group", error: error.message });
  }
});

router.delete('/api/groups/:groupId', async (req, res) => {
  try {
    const result = await dao.deleteGroup(req.params.groupId);
    res.json({ message: "Group deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete group", error: error.message });
  }
});

export default router;