import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, Routes, Route } from "react-router-dom";
import * as client from "../client/tmdbClient"

// Search component
function MovieResults({ maxResults = -1 }) {

    const navigate = useNavigate();

    const { searchParam } = useParams(); // maintain "state" through URL encoding
    const [searchTerm, setSearchTerm] = useState(searchParam); // keeps track of search term in search bar
    const [results, setResults] = useState(null); // keeps track of any displayed results
    const [untrimmedResultLength, setUntrimmedResultLength] = useState(-1);

    // Get list of movie results
    const getSearchedMoviesResults = async (searchParam) => {
        const results = await client.findMovies(searchParam);
        setUntrimmedResultLength(results.length);
        if (maxResults < 0) {
            setResults(results)
            
        } else {
            setResults(results.slice(0, maxResults));
        }
    }

    useEffect(() => {
        // if there is a search in the URL, get results
        if (searchParam) {
            getSearchedMoviesResults(searchParam);
        } else {
            setResults(null);
        }  // else reset
    }, [searchParam]); // if the searchParam ever changes, re-update the results
    return (
        <div>

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
            {maxResults >= 0 && <div>
                <Link to={`/Search/movies/${searchParam}`}>{untrimmedResultLength - maxResults} more results... </Link>
                </div>}
            {/* <>JSON results:</>
            <pre>{JSON.stringify(results, null, 2)}</pre> */}
        </div>
    )
}

export default MovieResults;

// TODO: augment with likes when available