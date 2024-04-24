import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';
import * as client from "../UserServices/client"

interface Member {
    userId: string;
    role: string;
}

interface Group {
    _id: string;
    name: string;
    description: string;
    members: Member[];
    memberCount: number;
}

const GroupsPage = () => {
  const [profile, setProfile] = useState({ _id: "", username: "", password: "",
 first_name: "", last_name: "", email: "", country: "", age: ""});
  const [groups, setGroups] = useState<Group[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      const { data } = await axios.get('http://localhost:4000/api/groups');
      setGroups(data);
    };
    fetchGroups();
  }, []);
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
  useEffect(() => {
    fetchProfile();
  }, []); 
  

  const joinGroup = async (groupId: string) => {
    try {
      // Assume 'currentUser' is available via context or has been fetched
      const userId = profile._id; // This should be fetched from user context or similar
      console.log(userId);
      const response = await axios.post(`http://localhost:4000/api/join/${groupId}`, { userId: userId });
      console.log('User added to group:', response.data);
      navigate(`/groups/${groupId}`)
      // Optional: Fetch groups again or update local state to reflect the new member count
    } catch (error) {
      console.error('Failed to join group:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Groups</Typography>
      <Grid container spacing={2}>
        {groups.map((group) => (
          <Grid item key={group._id} xs={12} md={6} lg={4}>
            <Card sx={{ maxWidth: 345, cursor: 'pointer' }} >
              <CardContent onClick={() => navigate(`/groups/${group._id}`)}>
                <Typography variant="h5">{group.name}</Typography>
                <Typography variant="body2">{group.description}</Typography>
                <Typography variant="body2">Members: {group.memberCount}</Typography>
               
              </CardContent>
              <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={() => joinGroup(group._id)}>
                  Join Group
                </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GroupsPage;