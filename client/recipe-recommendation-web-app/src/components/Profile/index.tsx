import "./index.css"
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
      alert("Please Log in");
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
      
         <div className="form ">
         <div style={{float:"right"}}>
        <button className="btn btn-primary form-control" style={{background:"#862B0D", margin:"5px", padding:"5px"}} onClick={() => navigate(`/Publicprofile/${profile.username}`)}>
          View Public Profile
        </button>
      </div>
      <br></br>
                <label className="float-start" htmlFor="user">Username: </label>
                <input id="user" className="form-control" readOnly={true} value={profile.username} onChange={(e) =>
                    setProfile({ ...profile, username: e.target.value })}/>
                <br/>
                <label className="float-start" htmlFor="pw">Password: </label>
                <input id="pw" className="form-control" value={profile.password} onChange={(e) =>
                    setProfile({ ...profile, password: e.target.value })}/>
                <br/>
                <label className="float-start" htmlFor="fname">First Name: </label>
                <input id="fname" className="form-control" value={profile.first_name} onChange={(e) =>
                    setProfile({ ...profile, first_name: e.target.value })}/>
                <br/>
                <label className="float-start" htmlFor="lname">Last Name: </label>
                <input id="lname" className="form-control" value={profile.last_name} onChange={(e) =>
                    setProfile({ ...profile, last_name: e.target.value })}/>
                <br/>
                <label className="float-start" htmlFor="age">Age: </label>
                <input id="age" className="form-control" value={profile.age} onChange={(e) =>
                    setProfile({ ...profile, age: e.target.value })}/>
                <br/>
                <label className="float-start" htmlFor="country">Country: </label>
                <input id="country" className="form-control" value={profile.country} onChange={(e) =>
                    setProfile({ ...profile, country: e.target.value })}/>
                <br/>
                <label className="float-start" htmlFor="email">Email: </label>
                <input id="email" className="form-control" value={profile.email} onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })}/>
                <br/>
                <label className="float-start" htmlFor="role">User Role: </label> {" "}
                <input id="role" className="form-control" value={profile.role} readOnly={true}/>
                <br/><br/>
                <button className="btn btn-primary form-control" onClick={save}>
          Save
        </button>
        <Button
          variant="contained"
          style={{background:"#862B0D"}}
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