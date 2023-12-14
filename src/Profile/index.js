import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as client from "../client/userClient";
import "./index.css";

// shows the profile page of a particular user
function Profile() {

    const navigate = useNavigate();

    const pageUsername = useParams().username;
    const loggedInUser = useSelector((state) => state.userReducer).user; // get logged in state
    const [pageUser, setPageUser] = useState(null);
    const [pageOwnerFlag, setPageOwnerFlag] = useState(false)

    const getPageUser = async () => {
        if (pageUsername == loggedInUser.username) {
            setPageUser(loggedInUser);
            setPageOwnerFlag(true);
        } else {
            const results = await client.findUserByUsername(pageUsername);
            setPageUser(results);
            setPageOwnerFlag(false);
        }
    }

    useEffect(() => {
        getPageUser();
    }, [pageUsername])

    return (
        <>
            <h2>Profile</h2>
            {pageUser && <>
                <div class="row align-items-center m3-profile-row">
                    <div class="col-2 m3-profile-col1">
                        Username:</div>
                    <div class="col-10 col-sm-7 col-xl-6" >
                        {pageUser.username}</div>
                </div>
                <div class="row align-items-center m3-profile-row">
                    <div class="col-2 m3-profile-col1">
                        First name:</div>
                    <div class="col-10 col-sm-7 col-xl-6" >
                        {pageUser.firstName}</div>
                </div>
                <div class="row align-items-center m3-profile-row">
                    <div class="col-2 m3-profile-col1">
                        Last name:</div>
                    <div class="col-10 col-sm-7 col-xl-6" >
                        {pageUser.lastName}</div>
                </div>
            </>}

            {pageUser && pageOwnerFlag &&
                <div class="row align-items-center m3-profile-row">
                    <div class="col-2 m3-profile-col1">
                        Email:</div>
                    <div class="col-10 col-sm-7 col-xl-6" >
                        {pageUser.email}</div>
                </div>}

            {loggedInUser != "" && loggedInUser.username === pageUsername && (
                <div className="p-3">
                    <button
                        className="btn btn-info ms-3" type="submit"
                        onClick={() => navigate(`/profile/settings`)}>
                        Edit Profile</button>
                    <button
                        className="btn btn-warning ms-3" type="submit"
                        onClick={() => navigate(`/signout`)}>
                        Sign Out</button>
                </div>)}

            <h2>Likes</h2>

            {/* <>JSON ccurrent logged in user:</>
            <pre>{JSON.stringify(loggedInUser, null, 2)}</pre> */}
        </>
    )
}

export default Profile;

// TODO: Check if user exists, if not dont show page
// TODO: grab discussions and likes
// TODO: allow admin to edit profile