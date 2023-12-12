import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as client from "../client/tmdbClient"

// Search component
function Search() {

    const navigate = useNavigate();

    const { searchParam } = useParams(); // maintain "state" through URL encoding
    const [searchTerm, setSearchTerm] = useState(searchParam); // keeps track of search term in search bar
    const [results, setResults] = useState(null); // keeps track of any displayed results

    // Get list of movie results
    const getSearchedMoviesResults = async (searchParam) => {
        const results = await client.findMovies(searchParam);
        setResults(results.slice(0, 4));
        setSearchTerm(searchParam)
    }

    useEffect(() => {
        // if there is a search in the URL, get results
        if (searchParam) {
            getSearchedMoviesResults(searchParam);
        }
        // else nothing
    }, [searchParam]); // if the searchParam ever changes, re-update the results
    return (
        <div>
            <h1>Search</h1>
            <div className="row">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Movie Title"
                        value={searchTerm}
                        onChange={(event) => {
                            setSearchTerm(event.target.value);
                        }}
                    />
                </div>
                <div className="col-auto">
                    <button
                        onClick={() => navigate(`/Search/${searchTerm}`)}
                        className="btn btn-primary float-end"
                    >
                        Search
                    </button>
                </div>
            </div>
            <hr />

            <h2>Movies</h2>
            <ul className="list-group">
                {results &&
                    results.map((movie, index) => (
                        <li key={index} className="list-group-item d-flex flex-row ">
                            <div className="p-2">
                                <img
                                    src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            </div>
                            <div className="p-2">
                                <h4><Link to={`/details/${movie.id}`}> {movie.title}</Link></h4>
                                Released: {movie.release_date}
                                <br />
                                {movie.overview}
                            </div>
                        </li>
                    ))}
            </ul>

            <hr />
            <h2>Users</h2>
            WIP user search here
            {/* <>JSON results:</>
            <pre>{JSON.stringify(results, null, 2)}</pre> */}
        </div>
    )
}

export default Search;

// TODO: augment with likes when available