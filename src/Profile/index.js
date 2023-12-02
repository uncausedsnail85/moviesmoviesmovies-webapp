import { useSelector, useDispatch } from "react-redux";

function Profile() {
    const { user } = useSelector((state) => state.userReducer);
    return(
        <>
        <h2>Profile</h2>
        Username: {user.username}
        </>
    )
}

export default Profile;

//. TODO: Profile not refreshing when logout
