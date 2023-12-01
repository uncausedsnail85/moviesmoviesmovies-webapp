import * as client from "../client/userClient";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
function Signin() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const signin = async () => {
        await client.signin(credentials);
        navigate(-1);
    };
    return (
        <div>
            <div class="wd-dashboard-header d-none d-sm-block">
                <h3>Sign in</h3>
                <hr />
            </div>
            <div className=" wd-dashboard-content">
                <label for="username">Username</label>
                <input value={credentials.username} id="username" onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
                <br /><br />
                <label for="password">Password</label>
                <input type="password" value={credentials.password} id="password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                <br /><br />
                <button onClick={signin}> Sign in </button>
                <br/>
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

// TODO: Handle failed login
// TODO: Create application state var of User and its reducer. update that after succesful login