import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as client from "../client/userClient";
import { setUser, setUserToNull } from "./userReducer";

function Signout() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.userReducer);
    const [asd, setAsd] = useState(null);
    const getLoggedInUser = async () => {
        const qwe = await client.getLoggedInUser();
        setAsd(qwe);
    };

    const signout = async () => {
        const results = await client.signout();
        console.log(`results: ${JSON.stringify(results)}`)
        if (results === "200") {
            dispatch(setUserToNull());
            navigate(-1);
        } else {
            // TODO: inform user, dialog?
            navigate(-1); 
        }
    };

    useEffect(() => {
        getLoggedInUser();
        signout();
    }, []);

    return (
        <div>
            Signing out...
            <pre>App state: {JSON.stringify(user, null, 2)}</pre>
            <pre>Server state: {JSON.stringify(asd, null, 2)}</pre>
        </div >
    );
}
export default Signout;