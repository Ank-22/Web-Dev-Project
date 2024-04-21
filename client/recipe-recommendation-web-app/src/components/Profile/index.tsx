import "./index.css"
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as client from "../UserServices/client"

interface ProfileProps {
    role: string;
    setRole: React.Dispatch<React.SetStateAction<string>>;
}


function Profile ({role, setRole}: ProfileProps) {
    const [profile, setProfile] = useState({ username: "", password: "",
        first_name: "", last_name: "", email: "", role: role, country: "", age: ""});

    const navigate = useNavigate();
    const fetchProfile = async () => {
        try {
            const account = await client.profile();
            if (account) {
                setRole(account.role);
                setProfile(account);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            navigate("/Home");
        }
    };


    const save = async () => {
        await client.updateUser(profile);
        alert("Update successful!");
    };
/*
    const signout = async () => {
        await client.signout();
        navigate("/Home");
    };

     */

    useEffect(() => {
        fetchProfile();
    }, []);
    return (
        <div>
            <h1>Profile</h1>

            <div className="form ">
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
                <br/><br/>
                <button className="btn btn-danger form-control" onClick={() =>console.log("Hello")}>
                    Sign Out
                </button>
            </div>

        </div>
    );
}

export default Profile;