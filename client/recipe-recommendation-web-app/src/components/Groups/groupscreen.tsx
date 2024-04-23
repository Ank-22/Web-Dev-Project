import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';

export const BASE_API = process.env.REACT_APP_API_BASE;

interface User {
  role: string;
  userId: string;
  first_name: string;
  _id:string
}

interface Member extends User {
  role: string;
}

interface Group {
  _id: string;
  name: string;
  description: string;
  members: Member[];
  memberCount: number;
}

const GroupScreen = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState<Group | null>(null);
  const [membersDetails, setMembersDetails] = useState<User[]>([]);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const { data } = await axios.get(`${BASE_API}/api/groups/${groupId}`);
        setGroup(data);
        fetchMembersDetails(data.members);
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };

    fetchGroup();
  }, [groupId]);

  const fetchMembersDetails = async (members: Member[]) => {
    try {
      const membersData = await Promise.all(
        members.map(member =>
          axios.get(`${BASE_API}/api/users/${member.userId}`)
        )
      );
      setMembersDetails(membersData.map(res => res.data));
    } catch (error) {
      console.error('Error fetching members details:', error);
    }
  };

  return (
    <Container>
      <Box mt={2} mb={2}>
        {group ? (
          <>
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h4" component="div">
                  {group.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {group.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Member Count: {group.memberCount}
                </Typography>
              </CardContent>
            </Card>
            <Typography variant="h5" gutterBottom>
              Members
            </Typography>
            <Grid container spacing={2}>
              {membersDetails.map(member => (
                <Grid item key={member.userId} xs={12} sm={6} md={4}>
                  <Card>
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <PersonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={member.first_name} secondary={member.role} />
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Box display="flex" justifyContent="center">
            <GroupIcon sx={{ fontSize: 100 }} />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default GroupScreen;