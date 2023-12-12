import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, Routes, Route } from "react-router-dom";

function UserResults() {

    const { searchParam } = useParams(); // maintain "state" through URL encoding
    console.log(`searchParam: ${searchParam}`);
    return (<>
        <h2>Users</h2>
        WIP user search here
    </>)
}

export default UserResults;