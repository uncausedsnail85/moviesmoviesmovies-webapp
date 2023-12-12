import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SearchBar() {
    const navigate = useNavigate();
    // var searchParam = "";
    let {searchParam}  = useParams(); // maintain "state" through URL encoding
    const [searchTerm, setSearchTerm] = useState(searchParam); // keeps track of search term in search bar
    console.log(`searchParam: ${JSON.stringify(searchParam)}`)
    console.log(`searchTerm: ${JSON.stringify(searchTerm)}`)

    return (<>
        <h1>Search</h1>
        <div className="row">
            <div className="col">
                <input
                    type="text"
                    className="form-control"
                    placeholder={"Search anything"}
                    value={searchTerm}
                    onChange={(event) => {
                        setSearchTerm(event.target.value);
                    }}
                />
            </div>
            <div className="col-auto">
                <button
                    onClick={() => navigate(`/Search/all/${searchTerm}`)}
                    className="btn btn-primary float-end"
                >
                    Search All
                </button>
            </div>
        </div>
        <div className="d-flex flex-row">
            <div className="p-1 mt-1">
                <button
                    className="btn btn-warning"
                    onClick={() => navigate(`/Search/movies/${searchTerm}`)} >
                    Movies
                </button>
            </div>
            <div className="p-1 mt-1">
                <button
                    className="btn btn-warning"
                    onClick={() => navigate(`/Search/users/${searchTerm}`)} >
                    Users
                </button>
            </div>
        </div>
    </>)
}

export default SearchBar