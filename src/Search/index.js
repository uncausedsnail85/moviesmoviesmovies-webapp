import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, Routes, Route } from "react-router-dom";
import * as client from "../client/tmdbClient"
import Results from "./Results.js";
import SearchBar from "./SearchBar.js";
import MovieResults from "./MovieResults.js";
import UserResults from "./UserResults.js";
import TvShowResults from "./TvShowResults.js";

// Search component
function Search() {

    // const { searchParam } = useParams(); // maintain "state" through URL encoding
    // console.log(`index searchParam: ${searchParam}`)
    // const [searchTerm, setSearchTerm] = useState(searchParam); // keeps track of search term in search bar
    // console.log(`searchTerm: ${searchTerm}`)

    // useEffect(() => {
    //     setSearchTerm(searchParam);
    // }, [searchParam])
    // TODO: figure out how to pass searchobject to search bar button
    return (
        <>
            <Routes>
                <Route path="/*" element={<SearchBar  />} />
                <Route path="/:searchParam" element={<SearchBar />} />
            </Routes>
            <Routes>
                <Route path="/:searchParam" element={<Results />} />
                <Route path="/all/:searchParam" element={<Results />} />
                <Route path="/movies/:searchParam" element={<MovieResults />} />
                <Route path="/users/:searchParam" element={<UserResults />} />
                <Route path="/shows/:searchParam" element={<TvShowResults />} />
                {/* <Route path="/:searchObject/:searchParam" element={<Results />} /> */}
            </Routes>
        </>
    )
}

export default Search;

// TODO: augment with likes when available