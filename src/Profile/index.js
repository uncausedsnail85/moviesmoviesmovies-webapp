import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";

// shows the profile page of a particular user
function Profile() {

    const navigate = useNavigate();

    const { username } = useParams();
    // const { user } = useSelector((state) => state.userReducer);
    const [user, setUser] = useState()

    // TO DO: GET USER DETAILS WHEN AVAILABLE

    return(
        <>
        <h2>Profile</h2>
        {username}'s profile
        </>
    )
}

export default Profile;

//. TODO: Profile not refreshing when logout
