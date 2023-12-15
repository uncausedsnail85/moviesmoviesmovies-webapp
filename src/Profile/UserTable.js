import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as client from "../client/userClient";
import { BsFillCheckCircleFill, BsPencil, BsPlusCircleFill, BsTrash3Fill }
    from "react-icons/bs";
import { Link } from "react-router-dom";

function UserTable() {

    const loggedInUser = useSelector((state) => state.userReducer).user;

    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };

    const [user, setUser] = useState({ username: "", password: "", role: "USER" });
    const createUser = async () => {
        try {
            const newUser = await client.signup(user);
            setUsers([newUser, ...users]);
        } catch (err) {
            console.log(err);
        }
    };
    const selectUser = async (index) => {
        try {
            console.log("select start")
            const u = users[index]
            console.log(`select found user: ${JSON.stringify(u)}`)
            setUser(u);
            console.log(`set user`)
        } catch (err) {
            console.log(`selectUser error: ${err}`);
        }
    };
    const updateUser = async () => {
        try {
            const status = await client.updateUser(user);
            setUsers(users.map((u) => (u._id === user._id ? user : u)));
        } catch (err) {
            console.log(err);
        }
    };
    const deleteUser = async (user) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => { fetchUsers(); }, []);
    return (
        <>
            {loggedInUser && loggedInUser.role !== "ADMIN" &&
                <div>{"ACCESS DENIED"}</div>}
            {loggedInUser && loggedInUser.role === "ADMIN" &&
                <div>
                    <h1>User List</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <td className="text-nowrap">
                                    <input placeholder="Username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                                </td>
                                <td >
                                    <input placeholder="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />

                                </td>
                                <td>
                                    <input placeholder="First Name" value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                                </td>
                                <td>
                                    <input placeholder="Last Name" value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                                </td>
                                <td><input placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                                </td>
                                <td>
                                    <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                                        <option value="USER">User</option>
                                        <option value="ADMIN">Admin</option>
                                        <option value="MOD  ">Moderator</option>
                                    </select>
                                </td>
                                <td className="text-nowrap">
                                    <BsFillCheckCircleFill onClick={updateUser}
                                        className="me-2 text-success fs-1 text" />
                                    <BsPlusCircleFill onClick={createUser}
                                        className="text-success fs-1 text" />
                                </td>
                            </tr>
                            <tr>

                            </tr>
                            <tr>
                                <th>Username</th>
                                <th>Password</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <td><Link to={`/profile/${user.username}`}>
                                        {user.username}
                                    </Link>
                                    </td>
                                    <td>
                                        {user.password}
                                    </td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td className="text-nowrap">
                                        <button className="btn btn-danger me-2">
                                            <BsTrash3Fill onClick={() => deleteUser(user)} />
                                        </button>
                                        <button className="btn btn-warning me-2">
                                            <BsPencil onClick={() => selectUser(index)} />
                                        </button>
                                    </td>
                                </tr>))}
                        </tbody>
                    </table>
{/* 
                    <>JSON selectedd in user:</>
                    <pre>{JSON.stringify(user, null, 2)}</pre> */}
                </div>
            }</>
    );
}
export default UserTable;