import {BsFillCheckCircleFill, BsPencil, BsPlusCircleFill, BsTrash3Fill} from "react-icons/bs";
import {useEffect, useState} from "react";
import * as client from "../UserServices/client"

interface UserData {
    _id: string;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    role: string;
}

function ManageUsers () {
    const [users, setUsers] = useState<UserData[]>([]);
    const [user, setUser] = useState({
        _id: "", username: "", password: "", first_name: "",
        last_name: "", role: "member" });
    const [role, setRole] = useState("member");
    const fetchUsersByRole = async (role: string) => {
        const users = await client.findUsersByRole(role);
        setRole(role);
        setUsers(users);
    };

    const createUser = async () => {


        try {
            const appendUserData = {
                username: user.username,
                password: user.password,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role
            }
            const newUser = await client.createUser(appendUserData);
            setUsers([newUser, ...users]);
            setUser({
                _id: "", username: "", password: "", first_name: "",
                last_name: "", role: "member" });
            alert("New user created successfully!");
            fetchUsers();
        } catch (err) {
            console.log(err);
        }


    };

    const deleteUser = async (user: any) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
            alert("New user deleted successfully!");
        } catch (err) {
            console.log(err);
        }
    };

    const selectUser = async (user: any) => {
        try {
            const u = await client.findUserById(user._id);
            setUser(u);
        } catch (err) {
            console.log(err);
        }
    };
    const updateUser = async () => {
        try {
            const status = await client.updateUser(user);
            setUsers(users.map((u) =>
                (u._id === user._id ? user : u)));
            alert("User updated successfully!");

        } catch (err) {
            console.log(err);
        }
    };



    const fetchUsers = async () => {
        try {
            const users = await client.findAllUsers();
            console.log(users)
            setUsers(users);
        }
        catch (err) {
            console.log(err);
        }
    };
    useEffect(() => { fetchUsers(); }, []);
    return (
        <>
            <div className="form-table">
                <div >
                    <h1 >Users Table</h1>
                </div>
                <div >
                    <hr style={{width:"100%"}}/>
                </div>


                <div >

                    <table className="table">
                        <thead>
                        <tr>
                            <td>
                                <label htmlFor="roleFilter">Filter by role:</label>
                                <select
                                    id="roleFilter"
                                    onChange={(e) => fetchUsersByRole(e.target.value)}
                                    value={role || "member"}
                                    className="form-control float-end"
                                >
                                    <option value="member">member</option>
                                    <option value="admin">admin</option>

                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input value={user.username} title="Enter a new user's username"
                                       placeholder="Enter new username here"
                                       onChange={(e) =>
                                           setUser({ ...user, username: e.target.value })}/>
                                {" "}
                                <input value={user.password} title="Enter a new user's password"
                                       placeholder="Enter new user's password here"
                                       onChange={(e) =>
                                           setUser({ ...user, password: e.target.value })}/>

                            </td>
                            <td>
                                <input value={user.first_name} title="Enter the user's first name"
                                       placeholder="Enter First Name here"
                                       onChange={(e) =>
                                           setUser({ ...user, first_name: e.target.value })}/>
                            </td>
                            <td>
                                <input value={user.last_name} title="Enter the user's last name"
                                       placeholder="Enter Last Name here"
                                       onChange={(e) =>
                                           setUser({ ...user, last_name: e.target.value })}/>
                            </td>
                            <td>
                                <select title="Select the user's role" value={user.role} onChange={(e) =>
                                    setUser({ ...user, role: e.target.value })}>
                                    <option value="member">member</option>
                                    <option value="admin">admin</option>
                                </select>
                            </td>
                            <td>
                                <button className="btn btn-success me-2"><BsFillCheckCircleFill onClick={updateUser}
                                                                                                style={{color: "white"}}/></button>
                            </td>
                            <td>
                                <button className="btn btn-success me-2"><BsPlusCircleFill style={{color: "white"}} onClick={createUser}/> </button>
                            </td>

                            <th>&nbsp;</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user: any) => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button style={{color: "white"}} className="btn btn-danger me-2" onClick={() => deleteUser(user)}>
                                        <BsTrash3Fill />
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-warning me-2">
                                        <BsPencil onClick={() => selectUser(user)} />
                                    </button>
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>


            </div>
        </>
    )
}

export default ManageUsers;