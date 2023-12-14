// VARIABLES ARE NAMED MOVIES, BUT THEY SHOULD BE TV SHOWS

import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as client from "../client/tmdbClient"
import * as likesClient from "../Likes/client"
import "./index.css";
import { useSelector } from "react-redux";
// DETAILS
// component displaying the details of a tvshow
// should have tmdbId param
function TvShow() {


    const { tmdbId } = useParams();
    const { user } = useSelector((state) => state.userReducer);
    // page state
    const [movie, setMovie] = useState(null);
    const [movieCredits, setMovieCredits] = useState([])
    const [likes, setLikes] = useState([0]);
    const [reviews, setReviews] = useState([]);


    //SW 1212 working on likes
    const currentUserLikesMovie = async (tmdbId) => {
        const likes = await likesClient.createUserLikesMovie(user.username, tmdbId)

    }
    // ### api calls ###
    const getMovieDetailsFromTmdbId = async (tmdbId) => {
        const results = await client.getShowDetailsfromTmdbId(tmdbId);
        setMovie(results);
    }

    const getMovieCreditsfromTmdbId = async (tmdbId) => {
        const results = await client.getShowCreditsfromTmdbId(tmdbId);
        const filteredResults = results.filter((cast) => cast.known_for_department === "Acting" && cast.order < 11)
        setMovieCredits(filteredResults);
        // console.log(JSON.stringify(filteredResults));
    }

    const getMovieLikes = async (tmdbId) => {

    }

    const getShowReviews = async (tmdbId) => {
        const results = await client.getReviewsFromShowId(tmdbId);
        setReviews(results);
    }

    useEffect(() => {

        getMovieDetailsFromTmdbId(tmdbId)
        getMovieCreditsfromTmdbId(tmdbId)
        getShowReviews(tmdbId)

    }, [])

    return (
        <>
            {movie && (
                <div>

                    <div className="row m3-detailtitle">
                        <div className="m3-detailtitle-text">
                            <h1>{movie.name}</h1>
                            {movie.number_of_seasons} seasons • {movie.first_air_date.slice(0, -6)} - {movie.last_air_date.slice(0, -6)} • {movie.genres.map((genre) => genre.name).join(', ')}</div>
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


                                <div class="p-2">Likes: {likes}</div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row cast">
                        Cast: {movieCredits.map(cast => cast.name).join(', ')}
                    </div>
                    <div className="d-flex flex-row mt-3 mb-3 companies align-items-center ">
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
                    <h3>Reviews</h3>
                    {reviews &&
                        reviews.map((review, index) => (
                            <>
                                <div className="d-flex flex-row mt-1 border rounded-top m3-review-container">
                                    <div className="ps-3 pt-2 fs-1 fw-b align-self-end m3-score" >{review.author_details.rating} </div><div className="p-2 align-self-end m3-score">/10</div>
                                    <div className="p-2 align-self-end flex-grow-1 m3-user">by {review.author_details.username} from TMDB</div>
                                </div>
                                <div className=" flex-row mb-3 p-2 border rounded-bottom m3-review">
                                    {review.content}
                                </div>
                            </>
                        ))}
                        {reviews.length == 0 && "No reviews founds"}
                    { }
                </div>
            )}
            {/* uncomment to see movie object */}
            {/* <>JSON movie:</>
            <pre>{JSON.stringify(movie, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(reviews, null, 2)}</pre> */}
        </>
    )
}

export default TvShow;

// TODO: Additional info from own db, i.e. likes
// TODO: Add discussion sectionx