import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";

// shows the profile page of a particular user
function Profile() {

    const navigate = useNavigate();

    const pageUsername = useParams().username;
    const loggedInUser = useSelector((state) => state.userReducer).user; // get logged in state
    // const [user, setUser] = useState()

    return (
        <>
            <h2>Profile</h2>
            {loggedInUser != "" && loggedInUser.username === pageUsername && (
                <button
                    className="btn btn-info" type="submit"
                    onClick={() => navigate(`/profile/settings`)}>
                    Edit Profile</button>)}
            <div class="row align-items-center m3-profile-row">
                <div class="col-2 m3-profile-col1">
                    Username:</div>
                <div class="col-10 col-sm-7 col-xl-6" >
                    {pageUsername}</div>
            </div>
            <div class="row align-items-center m3-profile-row">
                <div class="col-2 m3-profile-col1">
                    First name:</div>
                <div class="col-10 col-sm-7 col-xl-6" >
                    TODO: DB</div>
            </div>
            <div class="row align-items-center m3-profile-row">
                <div class="col-2 m3-profile-col1">
                    Last name:</div>
                <div class="col-10 col-sm-7 col-xl-6" >
                    TODO: DB</div>
            </div>
            <div class="row align-items-center m3-profile-row">
                <div class="col-2 m3-profile-col1">
                    Email:</div>
                <div class="col-10 col-sm-7 col-xl-6" >
                    TODO: DB</div>
            </div>

            <h2>Discussions</h2>
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