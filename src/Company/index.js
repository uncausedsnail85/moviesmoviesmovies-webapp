// VARIABLES ARE NAMED MOVIES, BUT THEY SHOULD BE COMPANIES

import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as client from "../client/tmdbClient"
import * as likesClient from "../Likes/client"
import "./index.css";
import { useSelector } from "react-redux";
import { FaLocationDot, FaLink } from "react-icons/fa6";

// DETAILS
// component displaying the details of a tvshow
// should have tmdbId param
function Company() {


    const { tmdbId } = useParams();
    const { user } = useSelector((state) => state.userReducer);
    // page state
    const [company, setCompany] = useState(null);
    const [likes, setLikes] = useState([0]);
    const [results, setResults] = useState(null); // keeps track of any displayed results


    //SW 1212 working on likes
    const currentUserLikesMovie = async (tmdbId) => {
        const likes = await likesClient.createUserLikesMovie(user.username, tmdbId)

    }
    // ### api calls ###
    const getCompanyDetailsFromTmdbId = async (tmdbId) => {
        const results = await client.getCompanyDetailsfromTmdbId(tmdbId);
        setCompany(results);
    }

    const getCompanyMovies = async (companyId) => {
        const results = await client.getMoviesFromCompanyId(companyId);
        setResults(results)
    }


    useEffect(() => {

        getCompanyDetailsFromTmdbId(tmdbId)
        getCompanyMovies(tmdbId)

    }, [])

    return (
        <>
            {company && (
                <div>
                    <div className="d-flex flex-row mb-3 align-items-end">
                        <div className="p-2 me-3"><img
                            src={`https://image.tmdb.org/t/p/w92/${company.logo_path}`}
                            alt={company.title}
                        /></div>
                        <div className="m3-company-name me-4">
                            {company.name}
                        </div>
                        <div className="pb-2 me-4">
                            <FaLocationDot /> {company.headquarters}
                        </div>
                        <div className="pb-2">
                            <Link to={company.homepage}><FaLink /> Website</Link>
                        </div>
                    </div>
                    <hr />
                    <h2>Movies</h2>
                    {results && results.length == 0 && "No matching results"}
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
                    <>JSON results:</>
            <pre>{JSON.stringify(results, null, 2)}</pre>
                </div>
            )}

            {/* uncomment to see company object */}
            {/* <>JSON:</>
            <pre>{JSON.stringify(company, null, 2)}</pre> */}
        </>
    )
}

export default Company;

// TODO: Additional info from own db, i.e. likes
// TODO: Add discussion sectionx