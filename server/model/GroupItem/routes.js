// groupItemRoutes.js
import express from 'express';
import * as dao from './dao.js';

export default function GroupItemRoutes(app) {
    app.post('/api/group-items', async (req, res) => {
        try {
            const item = await dao.createGroupItem(req.body);
            res.status(201).json(item);
        } catch (error) {
            res.status(400).json({ message: 'Failed to create group item', error: error.message });
        }
    });

    app.get('/api/group-items', async (req, res) => {
        try {
            const items = await dao.findAllGroupItems();
            res.json(items);
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve group items', error: error.message });
        }
    });

    app.get('/api/group-items/group/:groupId', async (req, res) => {
        try {
            const { groupId } = req.params;
            console.log(groupId)
            const items = await dao.findGroupItemsByGroupId(groupId);
            if(items.length > 0) {
                res.json(items);
            } else {
                res.status(404).json({ message: 'No items found for this group' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve group items', error: error.message });
        }
    });

    app.get('/api/group-items/:id', async (req, res) => {
        try {
            const item = await dao.findGroupItemById(req.params.id);
            if (item) {
                res.json(item);
            } else {
                res.status(404).json({ message: 'Group item not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve group item', error: error.message });
        }
    });

    app.put('/api/group-items/:id', async (req, res) => {
        try {
            const updatedItem = await dao.updateGroupItem(req.params.id, req.body);
            res.json(updatedItem);
        } catch (error) {
            res.status(400).json({ message: 'Failed to update group item', error: error.message });
        }
    });

    app.delete('/api/group-items/:id', async (req, res) => {
        try {
            await dao.deleteGroupItem(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete group item', error: error.message });
        }
    });
}