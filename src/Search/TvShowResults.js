import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as client from "../client/tmdbClient"

// Search component
function TvShowResults({ maxResults = -1 }) {

    // const navigate = useNavigate();

    const { searchParam } = useParams(); // maintain "state" through URL encoding
    const [results, setResults] = useState(null); // keeps track of any displayed results
    const [untrimmedResultLength, setUntrimmedResultLength] = useState(-1);

    // Get list of Tv Shows results
    const getSearchedResults = async (searchParam) => {
        const results = await client.findTvShows(searchParam);
        if (results == null) {
            return;
        }
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
            getSearchedResults(searchParam);
        } else {
            setResults(null);
        }  // else reset
    }, [searchParam]); // if the searchParam ever changes, re-update the results
    // console.log(`results: ${JSON.stringify(results)}`)
    return (
        <div>

            <h2>TV Shows</h2>
            <ul className="list-group">
                {results && results.length == 0 && "No matching results"}
                {results &&
                    results.map((show, index) => (
                        <li key={index} className="list-group-item d-flex flex-row ">
                            <div className="p-2">
                                <img
                                    src={`https://image.tmdb.org/t/p/w92/${show.poster_path}`}
                                    alt={show.title}
                                />
                            </div>
                            <div className="p-2">
                                <h4><Link to={`/details/show/${show.id}`}> {show.name}</Link></h4>
                                First aired: {show.first_air_date}
                                <br />
                                {show.overview}
                            </div>
                        </li>
                    ))}
            </ul>
            {maxResults >= 0 && untrimmedResultLength - maxResults > 0 && <div>
                <Link to={`/Search/shows/${searchParam}`}>{untrimmedResultLength - maxResults} more results... </Link>
                </div>}
            {/* <>JSON results:</>
            <pre>{JSON.stringify(results, null, 2)}</pre> */}
        </div>
    )
}

export default TvShowResults;

// TODO: augment with likes when available