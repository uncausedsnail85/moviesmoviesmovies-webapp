import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "../client/userClient";
import { setUser } from "../Account/userReducer";

function EditProfile() {
    const loggedInUser = useSelector((state) => state.userReducer).user;
    const [user, setPageUser] = useState(loggedInUser);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateUser = async () => {
        try {
            await client.updateUser(user);
            dispatch(setUser(user));
            navigate(`/profile/${user.username}`);
        } catch (err) {
            console.log(`err: ${JSON.stringify(err)}`)
            setError("Problem editing profile");
        }
    };

    useEffect(() => {
        // check if not logged in, if so redirect
        // console.log(`loggedInUser: ${loggedInUser}`)
        if (loggedInUser == "") {
            navigate(`/home`);
        }
    }, []);

    useEffect(() => {
        setPageUser(loggedInUser);
    }, [loggedInUser])

    return (<>
        <h3>Edit Profile</h3>
        {error && (
            <div className="alert alert-danger mb-2 mt-2">
                {error}
            </div>
        )}
        <form className="">
            <label for="username" className="me-2 form-label">Username </label>
            <input value={user.username}
                className="form-control mb-1"
                id="username"
                onChange={(e) => setPageUser({ ...user, username: e.target.value })} />

            <label for="password" className="me-2 form-label">Password</label>
            <input type="password"
                className="form-control mb-3"
                value={user.password}
                id="password"
                onChange={(e) => setPageUser({ ...user, password: e.target.value })} />

            <label for="email" className="me-2 form-label">Email</label>
            <input type="email"
                className="form-control mb-3"
                value={user.email}
                id="email"
                onChange={(e) => setPageUser({ ...user, email: e.target.value })} />

            <label for="firstName" className="me-2 form-label">First name</label>
            <input type="firstName"
                className="form-control mb-3"
                value={user.firstName}
                id="firstName"
                onChange={(e) => setPageUser({ ...user, firstName: e.target.value })} />

            <label for="lastName" className="me-2 form-label">Last name</label>
            <input type="lastName"
                className="form-control mb-3"
                value={user.lastName}
                id="lastName"
                onChange={(e) => setPageUser({ ...user, lastName: e.target.value })} />

            <label>Role:</label> <br />

            <div className="form-check">
                <input className="form-check-input" type="radio" name="gridRadios" id="user"
                    value={user.role == "USER"}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setPageUser({ ...user, role: "USER" })
                        }
                    }}
                />
                <label className="form-check-label" for="user">
                    User</label>
            </div>

            <div className="form-check">
                <input className="form-check-input" type="radio" name="gridRadios" id="cast"
                    value={user.role == "CAST"}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setPageUser({ ...user, role: "CAST" })
                        }
                    }}
                />
                <label className="form-check-label" for="cast">
                    Cast</label>
            </div>

            <div className="form-check disabled">
                <input className="form-check-input" type="radio" name="gridRadios" id="admin"
                    value={user.role == "ADMIN"}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setPageUser({ ...user, role: "ADMIN" })
                        }
                    }}
                />
                <label className="form-check-label" for="admin">
                    Admin</label>
            </div>
        </form>
        < button className="btn btn-info mt-3 me-3" onClick={updateUser}>
            Edit Profile
        </button>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
            Cancel
        </button>
        <br />
        {/* <>Logged inUser :</>
        <pre>{JSON.stringify(loggedInUser, null, 2)}</pre> */}
    </>)
}

export default EditProfile

// TODO: implement api client