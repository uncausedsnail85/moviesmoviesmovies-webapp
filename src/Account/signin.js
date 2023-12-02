import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as client from "../client/userClient";
import { setUser, setUserToNull } from "./userReducer";

function Signin() {

    // page state
    const { user } = useSelector((state) => state.userReducer);
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [errorFlag, setErrorFlag] = useState(false);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signin = async () => {
        const results = await client.signin(credentials);
        // console.log(`results: ${JSON.stringify(results)}`)
        if (results == null) {
            // fail login
            setErrorFlag(true);
        } else {
            // success
            dispatch(setUser(results));
            navigate(-1);
        }
    };

    useEffect(() => {
        // check if already logged in, if so redirect
        // console.log(user)
        if (user !== "") {
            navigate(`/user/${user.username}`);
        }
    }, []);

    return (
        <div>
            {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
            <div class="wd-dashboard-header d-none d-sm-block">
                <h3>Sign in</h3>
                <hr />
            </div>
            {errorFlag && (
                <div className="alert alert-danger mb-2 mt-2">
                    Invalid login credentials. Please try again.
                </div>

            )}
            <div className="">
                <label for="username">Username</label>
                <input value={credentials.username} id="username" onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
                <br /><br />
                <label for="password">Password</label>
                <input type="password" value={credentials.password} id="password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                <br /><br />
                <button onClick={signin}> Sign in </button>
                <br />
                {/* <Link to="/Kanbas/admin/users" className="btn btn-warning">
                    Users
                </Link>
                <br/>
                <Link to="/Kanbas/Signup" className="btn btn-primary">
                    Sign Up
                </Link> */}

            </div>
        </div >
    );
}
export default Signin;