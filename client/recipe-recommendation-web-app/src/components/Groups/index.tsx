import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';


interface Member {
    userId: string;
    role: string;
}

// Define the structure of a single group object
interface Group {
    _id: string;
    name: string;
    description: string;
    members: Member[];
    memberCount: number;
}

const GroupsPage = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const { data } = await axios.get('http://localhost:4000/api/groups');
      setGroups(data);
    };
    fetchGroups();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Groups</Typography>
      <Grid container spacing={2}>
        {groups.map((group) => (
          <Grid item key={group._id} xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">{group.name}</Typography>
                <Typography variant="body2">{group.description}</Typography>
                <Typography variant="body2">Members: {group.memberCount}</Typography>
                <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                  Join Group
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GroupsPage;
