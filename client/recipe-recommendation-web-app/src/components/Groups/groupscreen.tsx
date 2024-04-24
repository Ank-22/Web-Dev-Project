import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
 Collapse,
 IconButton,
 CardMedia,
 Button,
 Dialog,
 DialogTitle,
 DialogContent,
 DialogActions,
 TextField,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styled } from '@mui/material/styles';
import * as client from "../UserServices/client"
export const BASE_API = process.env.REACT_APP_API_BASE;
interface User {
 role: string;
 userId: string;
 first_name: string;
 username: string;
 _id: string;
}
interface Member extends User {
 role: string;
}
interface Post {
 name: string;
 content: string;
 imageUrl?: string;
 createdAt: string;
 createdBy: string;
}
interface Group {
 _id: string;
 name: string;
 description: string;
 members: Member[];
 memberCount: number;
 posts: Post[];
}
const ExpandMore = styled((props: any) => {
 const { expand, ...other } = props;
 return <IconButton {...other} />;
})(({ theme, expand }) => ({
 transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
 marginLeft: 'auto',
 transition: theme.transitions.create('transform', {
   duration: theme.transitions.duration.shortest,
 }),
}));
const GroupScreen = () => {
   const navigate = useNavigate();
 const { groupId } = useParams();
 const [group, setGroup] = useState<Group | null>(null);
 const [membersDetails, setMembersDetails] = useState<User[]>([]);
 const [expanded, setExpanded] = useState(false);
 const [profile, setProfile] = useState({ _id: "", username: "", password: "",
 first_name: "", last_name: "", email: "", country: "", age: ""});
 const [open, setOpen] = useState(false);
 const [postName, setPostName] = useState('');
 const [postContent, setPostContent] = useState('');
 useEffect(() => {
   const fetchGroup = async () => {
     try {
       const groupResponse = await axios.get(`${BASE_API}/api/groups/${groupId}`);
       const groupData: Group = groupResponse.data;
       setGroup(groupData);
       const membersResponse = await Promise.all(
         groupData.members.map(member =>
           axios.get(`${BASE_API}/api/users/${member.userId}`)
         )
       );
       setMembersDetails(membersResponse.map(res => res.data));
       // Fetch posts related to the group
       const postsResponse = await axios.get(`${BASE_API}/api/group-items/group/${groupId}`);
       setGroup((prev: Group | null) => ({
 ...prev!,
 posts: postsResponse.data // Assuming postsResponse.data is an array of posts
}));
     } catch (error) {
       console.error('Error fetching group details:', error);
     }
   };
   fetchGroup();
 }, [groupId]);
 const handleExpandClick = () => {
   setExpanded(!expanded);
 };
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

const handleClickOpen = () => {
 setOpen(true);
};
const handleClose = () => {
 setOpen(false);
};
const handleCreatePost = async () => {
 const newPost = {
   name: postName,
   content: postContent,
   createdBy: profile.username,
   groupId: groupId,
   type: 'post'
 };
 try {
  console.log(newPost)
   const response = await axios.post(`${BASE_API}/api/group-items`, newPost);
   console.log(response.data)
   const updatedGroup = { ...group! };
   console.log("UpdatedGroups")
   console.log(updatedGroup)
   updatedGroup.posts.push(response.data);
   setGroup(updatedGroup);
   setOpen(false);
 } catch (error) {
   console.error('Error creating post:', error);
   setOpen(false);
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
<ExpandMore
                 expand={expanded}
                 onClick={handleExpandClick}
                 aria-expanded={expanded}
                 aria-label="show more"
>
<ExpandMoreIcon />
</ExpandMore>
</CardContent>
</Card>
<Collapse in={expanded} timeout="auto" unmountOnExit>
<Typography variant="h5" gutterBottom>
               Members
</Typography>
<Grid container spacing={2} sx={{ maxHeight: 300, overflowY: 'auto' }}>
               {membersDetails.map(member => (
<Grid item key={member._id} xs={12} sm={6} md={4}>
<Card onClick={() => navigate(`/PublicProfile/${member.username}`)}>
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
</Collapse>
<Typography variant="h5" sx={{ mt: 4 }} gutterBottom>
<div style={{margin:"10px", padding:'10px'}}>
{membersDetails.some(member => member.username == profile.username) &&
  <Button
               variant="contained"
               startIcon={<AddCircleIcon />}
               onClick={handleClickOpen}
               style={{ marginBottom: '10px', float:'right', background:'#862B0D'}}
>
               Add Post
</Button>

}
             Posts
</div>
</Typography>
<div className='container-fluid'>
{group.posts &&
  <Grid container spacing={2}>
             {group.posts?.map((post, index) => (
<Card  style={{width: "100%"}} key={index} sx={{ mb: 2 }}>
                   {post.imageUrl && (
<CardMedia
                       component="img"
                       height="140"
                       image={post.imageUrl}
                       alt="Post image"
                     />
                   )}
<CardContent>
<Typography variant="h6">{post.name}</Typography>
<Typography variant="caption" display="block" color="text.secondary">
<div onClick={() => navigate(`/PublicProfile/${post.createdBy}`)}>
                       Created By: {post.createdBy}
</div>
</Typography>
<Typography variant="body2" >
                       {post.content}
</Typography>
<Typography variant="caption" display="block" color="text.secondary">
                       Posted on: {new Date(post.createdAt).toLocaleString()}
</Typography>
</CardContent>
</Card>
             ))}
</Grid>
}
</div>
</>
       ) : (
<Box display="flex" justifyContent="center">
<GroupIcon sx={{ fontSize: 100 }} />
</Box>
       )}
</Box>
<Dialog open={open} onClose={handleClose}>
<DialogTitle>Create New Post</DialogTitle>
<DialogContent>
<TextField
           autoFocus
           margin="dense"
           id="name"
           label="Name"
           type="text"
           fullWidth
           value={postName}
           onChange={(e) => setPostName(e.target.value)}
         />
<TextField
           margin="dense"
           id="content"
           label="Content"
           type="text"
           fullWidth
           multiline
           rows={4}
           value={postContent}
           onChange={(e) => setPostContent(e.target.value)}
         />
</DialogContent>
<DialogActions>
<Button onClick={handleClose}>Cancel</Button>
<Button onClick={handleCreatePost} variant="contained" color="primary">
           Create
</Button>
</DialogActions>
</Dialog>
</Container>
 );
};
export default GroupScreen;