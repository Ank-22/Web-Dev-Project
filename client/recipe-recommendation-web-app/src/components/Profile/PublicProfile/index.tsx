import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as client from "../../UserServices/client";
import { Card, CardContent, Container, Button, Typography } from "@mui/material";

interface ProfileProps {
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Profile({ role, setRole, setLoggedIn }: ProfileProps) {
  const { username } = useParams<{ username: string }>(); // Asserting that username is always a string
  const [profile, setProfile] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    country: "",
    age: "",
  });

  const navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      if (username) { // Ensure username is not undefined
        const account = await client.findUsersByUsername(username);
        if (account) {
          setRole(account.role);
          setProfile(account);
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

  const signout = async () => {
    await client.signout();
    setLoggedIn(false);
    navigate("/Home");
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
          <br />
          <Button
            variant="contained"
            color="error"
            onClick={signout}
            fullWidth
          >
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Profile;