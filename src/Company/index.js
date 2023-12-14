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


    //SW 1212 working on likes
    const currentUserLikesMovie = async (tmdbId) => {
        const likes = await likesClient.createUserLikesMovie(user.username, tmdbId)

    }
    // ### api calls ###
    const getCompanyDetailsFromTmdbId = async (tmdbId) => {
        const results = await client.getCompanyDetailsfromTmdbId(tmdbId);
        setCompany(results);
    }


    useEffect(() => {

        getCompanyDetailsFromTmdbId(tmdbId)

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
                </div>
            )}
            {/* uncomment to see company object */}
            <>JSON:</>
            <pre>{JSON.stringify(company, null, 2)}</pre>
        </>
    )
}

export default Company;

// TODO: Additional info from own db, i.e. likes
// TODO: Add discussion sectionx