import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
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
            navigate(`/home`);
        }
    };

    // Query parameter for successful sign up
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const signupFlag = query.get('signupSuccessful');

    useEffect(() => {
        // check if already logged in, if so redirect
        // console.log(`user: ${user}`)
        if (user !== "") {
            navigate(`/profile/${user.username}`);
        }
    }, [user]);

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
            {signupFlag && (
                <div className="alert alert-success" role="alert">
                    Sign up successful.
                </div>
            )}
            <form className="">
                <label for="username" className="me-2 form-label">Username </label>
                <input value={credentials.username}
                    className="form-control mb-1"
                    id="username"
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
                <label for="password" className="me-2 form-label">Password</label>
                <input type="password"
                    className="form-control mb-3"
                    value={credentials.password}
                    id="password"
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                <button className="btn btn-info me-3" onClick={signin}> Sign in </button>
                <button className="btn btn-warning"
                    onClick={() => navigate(`/signup`)} >
                    Sign Up </button>
                <br />
            </form>
            {/* {signupFlag} */}
        </div >
    );
}
export default Signin;