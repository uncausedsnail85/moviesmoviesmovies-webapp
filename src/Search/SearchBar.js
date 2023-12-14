import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SearchBar() {
    const navigate = useNavigate();
    // var searchParam = "";
    let { searchParam } = useParams(); // maintain "state" through URL encoding
    // console.log(`searchParam: ${searchParam}`)
    const [searchTerm, setSearchTerm] = useState(searchParam); // keeps track of search term in search bar
    console.log(`searchTerm: ${searchTerm}`)

    useEffect(() => {
        setSearchTerm(searchParam)
        // console.log(`in use effect" searchTerm: ${searchTerm}`)
    }, [searchParam])

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
        <div className="mb-3 d-flex flex-row flex-wrap">
            <div className="p-2 mt-1">Show only: </div>
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
                    onClick={() => navigate(`/Search/shows/${searchTerm}`)} >
                    TV Shows
                </button>
            </div>
            <div className="p-1 mt-1">
                <button
                    className="btn btn-warning"
                    onClick={() => navigate(`/Search/companies/${searchTerm}`)} >
                    Comapnies
                </button>
            </div>
        </div>
    </>)
}

export default SearchBar