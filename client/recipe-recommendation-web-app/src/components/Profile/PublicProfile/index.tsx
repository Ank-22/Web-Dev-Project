import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as client from "../../UserServices/client";
import {
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
  Box,
  CardHeader,
} from "@mui/material";
import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;

interface ProfileProps {
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Profile() {
  const { username } = useParams<{ username: string }>(); // Asserting that username is always a string
  const [profile, setProfile] = useState({
    _id: "",
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    country: "",
    age: "",
  });
  const [groups, setGroups] = useState<any[]>([]);

  const navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      if (username) {
        // Ensure username is not undefined
        const account = await client.findUsersByUsername(username);
        if (account) {
         
          setProfile(account);
          const userGroups = (await axios.get(`${BASE_API}/api/groups`)).data;
          console.log(userGroups)
          setGroups(
            userGroups.filter((group: any) =>
              group.members.find(
                (member: any) => member.userId === account._id
              )
            )
          );
        } else {
          console.error("No user found");
          navigate("/Home");
        }
      } else {
        console.error("Username is undefined");
        navigate("/Home");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      navigate("/Home");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [username]); // Include username in dependency array to refetch profile when username changes

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" component="div">
            Username: {profile.username}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            First Name: {profile.first_name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Last Name: {profile.last_name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Age: {profile.age}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Country: {profile.country}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Email: {profile.email}
          </Typography>
        </CardContent>
      </Card>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Groups Affiliated
        </Typography>
        <Box
          sx={{
            overflowX: "auto",
            scrollbarWidth: "none",
            marginBottom: "20px",
          }}
        >
          <Grid container spacing={2} sx={{ display: "flex" }}>
            {JSON.stringify(groups)}
            {groups.map((group: any, index) => (
              <Grid item xs={12} key={index}>
                <Card sx={{ backgroundColor: "#862B0D" }} onClick={() => navigate(`/groups/${group._id}`)}>
                  <CardHeader
                    title={group.name}
                    sx={{ color: "white", borderBottom: "1px solid #fff" }}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{ color: "white" }}
                    >
                      Description: {group.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{ color: "white" }}
                    >
                      Member Count: {group.memberCount}
                    </Typography>
                    {/* <Typography
                      variant="body2"
                      gutterBottom
                      sx={{ color: "white" }}
                    >
                      Group Role:{" "}
                      {group.members.find(
                        (member: any) => member.userId === profile._id
                      ).role}
                    </Typography> */}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Profile;