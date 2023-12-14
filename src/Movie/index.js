import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as client from "../client/tmdbClient"
import * as likesClient from "../Likes/client"
import "./index.css";
import { useSelector } from "react-redux";
// DETAILS
// component displaying the details of a movie
// should have tmdbMovieId param
function Movie() {


    const { tmdbMovieId } = useParams();
    const { user } = useSelector((state) => state.userReducer);
    // page state
    const [movie, setMovie] = useState(null);
    const [movieCredits, setMovieCredits] = useState([])


    //SW 1212 working on likes
    const currentUserLikesMovie = async (tmdbId) => {
        const likes = await likesClient.createUserLikesMovie(user.username, tmdbId)

    }
    // ### api calls ###
    const getMovieDetailsFromTmdbId = async (tmdbMovieId) => {
        const results = await client.getMovieDetailsfromTmdbId(tmdbMovieId);
        setMovie(results);
    }

    const getMovieCreditsfromTmdbId = async (tmdbMovieId) => {
        const results = await client.getMovieCreditsfromTmdbId(tmdbMovieId);
        const filteredResults = results.filter((cast) => cast.known_for_department === "Acting" && cast.order < 11)
        setMovieCredits(filteredResults);
        console.log(JSON.stringify(filteredResults));
    }

    useEffect(() => {

        getMovieDetailsFromTmdbId(tmdbMovieId)
        getMovieCreditsfromTmdbId(tmdbMovieId)

    }, [])

    // ### helper functions ###
    function minutesToHourAndMinutes(num) {
        var hours = Math.floor(num / 60);
        var minutes = num % 60;
        return hours + "h " + minutes + "m";
    }


    return (
        <>
            {movie && (
                <div>

                    <div className="row m3-detailtitle">
                        <div className="m3-detailtitle-text">
                            <h1>{movie.title}</h1>
                            {movie.release_date.slice(0, -6)} • {minutesToHourAndMinutes(movie.runtime)} • {movie.genres.map((genre) => genre.name).join(', ')}</div>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} class="img-fluid" alt="Responsive image" />
                    </div>
                    <div className="row m3-detailcontainer">
                        <div className="col-4 m3-img-col">
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt={movie.title}
                                className="img-fluid"
                            />
                        </div>
                        <div className="col">

                            <div class="d-flex align-items-start justify-content-around flex-column mb-3 h-100">
                                <div class="p-2 m3-movie-overview">{movie.overview}</div>

                                {/* //SW 1212 working on likes button*/}
                                {user.username && (
                                    <div>
                                        <button>Like</button>
                                    </div>
                                )}


                                <div class="p-2">Likes:0</div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row cast">
                        Cast: {movieCredits.map(cast => cast.name).join(', ')}
                    </div>
                    <div className="d-flex flex-row mt-3 mb-3 companies align-items-center flex-wrap">
                        {movie.production_companies.map((company, index) =>
                            <div className="ps-3 pe-3 border-end border-start "><Link to={`/details/company/${company.id}`}>
                                {company.logo_path && <img
                                    src={`https://image.tmdb.org/t/p/w92/${company.logo_path}`}
                                    alt={company.name}
                                />}
                                {!company.logo_path && company.name}
                            </Link></div>
                        )}
                    </div>
                </div>
            )}
            {/* uncomment to see movie object */}
            <>JSON movie:</>
            <pre>{JSON.stringify(movie, null, 2)}</pre>
        </>
    )
}

export default Movie;

// TODO: Additional info from own db, i.e. likes
// TODO: Add discussion section