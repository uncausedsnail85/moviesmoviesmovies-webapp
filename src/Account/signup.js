import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "../client/userClient";
import { useSelector } from "react-redux";

function Signup() {

    // page state
    const loggedInUser = useSelector((state) => state.userReducer).user;
    const [user, setUser] = useState({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        role: ""
    });

    const navigate = useNavigate();

    const [error, setError] = useState("");
    const signup = async () => {
        try {
            await client.signup(user);
            navigate("/signin?signupSuccessful=true");
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    useEffect(() => {
        // check if already logged in, if so redirect
        // console.log(`loggedInUser: ${loggedInUser}`)
        if (loggedInUser !== "") {
            navigate(`/home`);
        }
    }, []);

    return (<>
        <h3>Signup</h3>
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
                onChange={(e) => setUser({ ...user, username: e.target.value })} />

            <label for="password" className="me-2 form-label">Password</label>
            <input type="password"
                className="form-control mb-3"
                value={user.password}
                id="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })} />

            <label for="email" className="me-2 form-label">Email</label>
            <input type="email"
                className="form-control mb-3"
                value={user.email}
                id="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })} />

            <label for="firstName" className="me-2 form-label">First name</label>
            <input type="firstName"
                className="form-control mb-3"
                value={user.firstName}
                id="firstName"
                onChange={(e) => setUser({ ...user, firstName: e.target.value })} />

            <label for="lastName" className="me-2 form-label">Last name</label>
            <input type="lastName"
                className="form-control mb-3"
                value={user.lastName}
                id="lastName"
                onChange={(e) => setUser({ ...user, lastName: e.target.value })} />

            <label>Role:</label> <br />

            <div className="form-check">
                <input className="form-check-input" type="radio" name="gridRadios" id="user"
                    value={user.role == "USER"}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setUser({ ...user, role: "USER" })
                        }
                    }}
                />
                <label className="form-check-label" for="user">
                    User</label>
            </div>

            <div className="form-check">
                <input className="form-check-input" type="radio" name="gridRadios" id="cast"
                    value={user.role == "MOD"}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setUser({ ...user, role: "MOD" })
                        }
                    }}
                />
                <label className="form-check-label" for="cast">
                    Moderator</label>
            </div>

            <div className="form-check disabled">
                <input className="form-check-input" type="radio" name="gridRadios" id="admin"
                    value={user.role == "ADMIN"}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setUser({ ...user, role: "ADMIN" })
                        }
                    }}
                />
                <label className="form-check-label" for="admin">
                    Admin</label>
            </div>
        </form>
        < button className="btn btn-warning mt-3 me-3" onClick={signup}>
            Sign Up
        </button>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
            Cancel
        </button>
        <br />
        {/* <>User object:</>
        <pre>{JSON.stringify(user, null, 2)}</pre> */}
    </>)
}

export default Signup;

// TODO