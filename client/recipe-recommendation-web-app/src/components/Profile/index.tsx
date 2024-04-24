import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "../UserServices/client";
import { Snackbar, Button, TextField } from "@mui/material";
import { useSnackbar } from "notistack";

interface ProfileProps {
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Profile({ role, setRole, setLoggedIn }: ProfileProps) {
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    role: role,
    country: "",
    age: "",
  });

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Correctly placed useSnackbar hook

  const fetchProfile = async () => {
    try {
      const account = await client.profile();
      if (account) {
        setRole(account.role);
        setProfile(account);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      enqueueSnackbar('Please log in to continue.', { variant: 'error' });
      navigate("/Home", { replace: true });
    }
  };

  const save = async () => {
    await client.updateUser(profile);
    alert("Update successful!");
  };

  const signout = async () => {
    await client.signout();
    setLoggedIn(false);
    navigate("/Home");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <div className="form">
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={profile.username}
          InputProps={{
            readOnly: true,
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={profile.password}
          onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          value={profile.first_name}
          onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          value={profile.last_name}
          onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Age"
          variant="outlined"
          fullWidth
          type="number"
          value={profile.age}
          onChange={(e) => setProfile({ ...profile, age: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Country"
          variant="outlined"
          fullWidth
          value={profile.country}
          onChange={(e) => setProfile({ ...profile, country: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="User Role"
          variant="outlined"
          fullWidth
          value={profile.role}
          InputProps={{
            readOnly: true,
          }}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={save}
          sx={{ mb: 2 }}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={signout}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default Profile;