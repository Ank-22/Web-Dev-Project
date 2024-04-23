import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import * as client from "../UserServices/client"
const BASE_API = process.env.REACT_APP_API_BASE || 'http://localhost:4000';



// Mock function to get the current user's ID - replace this with your actual auth logic

interface User {
    _id:string
    username: string
    
  }






const CreateGroupPage = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [profile, setProfile] = useState({ _id: "", username: "", password: "",
        first_name: "", last_name: "", email: "", country: "", age: ""});
  const fetchProfile = async () => {
    try {
        const account = await client.profile();
        if (account) {
            setProfile(account);
        }
    } catch (error) {
        console.error("Error fetching profile:", error);
        navigate("/Home");
    }
};

const getCurrentUserId = () => {
    console.log(profile)
  return profile._id; // Replace this with the actual current user ID from your authentication logic
};

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const currentUserId = getCurrentUserId(); // Get the current user's ID

    try {
      // Add the current user as admin in the members array
      const newGroupData = {
        name: groupName,
        description,
        members: [{ userId: currentUserId, role: 'admin' }]
      };

      const response = await axios.post(`${BASE_API}/api/groups`, newGroupData);
      // If successful, navigate to the group details page or group list
      navigate(`/groups/${response.data._id}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'Error creating group');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };
  useEffect(() => {
    fetchProfile();
}, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Create New Group
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            id="groupName"
            label="Group Name"
            name="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Group
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateGroupPage;