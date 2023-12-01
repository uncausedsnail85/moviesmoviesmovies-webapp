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
        setResults(results);
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

            <h2>Results</h2>
            <ul className="list-group">
                {results &&
                    results.map((movie, index) => (
                        <li key={index} className="list-group-item">
                            
                            <img
                                src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <Link to={`/movie/${movie.id}`}> {movie.title}</Link>
                            <br />
                            Released: {movie.release_date}
                            <br />
                            {movie.overview}
                        </li>
                    ))}
            </ul>
            {/* <>JSON results:</>
            <pre>{JSON.stringify(results, null, 2)}</pre> */}
        </div>
    )
}

export default Search;