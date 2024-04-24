import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsPencil, BsPlusCircleFill, BsTrash3Fill } from 'react-icons/bs';
import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Box, Typography } from '@mui/material';

const BASE_API_URL = 'http://localhost:4000'; // Replace with your actual API base URL

// Define an interface for the group object
interface Group {
  _id: string;
  name: string;
  description: string;
}

function ManageGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editingFormData, setEditingFormData] = useState<{ name: string; description: string }>({ name: '', description: '' });

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get<Group[]>(`${BASE_API_URL}/api/groups`);
        setGroups(response.data);
      } catch (error) {
        console.error('Failed to fetch groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleEditClick = (group: Group) => {
    setEditingGroupId(group._id);
    setEditingFormData({ name: group.name, description: group.description });
  };

  const handleUpdateGroup = async () => {
    try {
      const response = await axios.put<Group>(`${BASE_API_URL}/api/groups/${editingGroupId}`, editingFormData);
      const updatedGroups = groups.map((group) => group._id === editingGroupId ? response.data : group);
      setGroups(updatedGroups);
      setEditingGroupId(null);
    } catch (error) {
      console.error('Failed to update group:', error);
    }
  };

  const deleteGroup = async (groupId: string) => {
    try {
      await axios.delete(`${BASE_API_URL}/api/groups/${groupId}`);
      setGroups(groups.filter((group) => group._id !== groupId));
    } catch (error) {
      console.error('Failed to delete group:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Manage Groups
      </Typography>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group._id}>
                <TableCell>
                  {editingGroupId === group._id ? (
                    <TextField
                      value={editingFormData.name}
                      onChange={(e) => setEditingFormData({ ...editingFormData, name: e.target.value })}
                      size="small"
                    />
                  ) : (
                    group.name
                  )}
                </TableCell>
                <TableCell>
                  {editingGroupId === group._id ? (
                    <TextField
                      value={editingFormData.description}
                      onChange={(e) => setEditingFormData({ ...editingFormData, description: e.target.value })}
                      size="small"
                    />
                  ) : (
                    group.description
                  )}
                </TableCell>
                <TableCell>
                  {editingGroupId === group._id ? (
                    <Button variant="contained" color="primary" onClick={handleUpdateGroup}>
                      Save
                    </Button>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEditClick(group)} color="primary">
                        <BsPencil />
                      </IconButton>
                      <IconButton onClick={() => deleteGroup(group._id)} color="error">
                        <BsTrash3Fill />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default ManageGroups;