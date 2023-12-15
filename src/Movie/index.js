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
    const [likes, setLikes] = useState([]);
    const [reviews, setReviews] = useState([]);

    const navigate = useNavigate();

    //SW 1212 working on likes
    const currentUserLikesMovie = async (tmdbId) => {
        const likes = await likesClient.createUserLikesMovie(user.username, tmdbId);
        await getLikes(tmdbId);

    };

    const getLikes = async (tmdbId) => {
        const results = await likesClient.findUsernamesThatLikeMovie(tmdbId);
        const flatResult = results.map(obj => obj.username);
        // console.log(JSON.stringify(flatResult))
        setLikes(flatResult);
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
        // console.log(JSON.stringify(filteredResults));
    }

    const getMovieReviews = async (tmdbMovieId) => {
        const results = await client.getReviewsFromMovieId(tmdbMovieId);
        setReviews(results);
    }

    useEffect(() => {
        getMovieDetailsFromTmdbId(tmdbMovieId)
        getMovieCreditsfromTmdbId(tmdbMovieId)
        getLikes(tmdbMovieId);
        getMovieReviews(tmdbMovieId);
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
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} class="img-fluid" alt="Movie Backdrop" />
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
                            <div class="d-flex align-items-start justify-content-between flex-column mb-3 h-100">
                                <div class="p-2 m3-movie-overview">{movie.overview}</div>

                                <div class="p-2">
                                    <b>{likes.length}</b> people like this movie
                                    <br />
                                    <div className="mt-2 mb-3 fs-6" >
                                        {likes.map(username => (<>
                                            <Link to={`/profile/${username}`}>{username}</Link>, </>))}
                                    </div>
                                    {user.username && (
                                        <button className="btn btn-primary" onClick={() => { currentUserLikesMovie(movie.id) }}>Like</button>
                                    )}
                                    {/* CONDITION IS BAD, BUT == "MOD" NOT WORKING */}
                                    {user && user.role !== 'USER' && (
                                        <button className="btn btn-danger ms-3"
                                            onClick={() => navigate(`/details/${tmdbMovieId}/editlikes`)}>
                                            EDIT LIKES
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row cast mb-5">
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

                </div>
            )}
            {/* uncomment to see movie object */}
            {/* <>JSON movie:</>
            <pre>{JSON.stringify(movie, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(reviews, null, 2)}</pre> */}
        </>
    )
}

export default Movie;

// TODO: Additional info from own db, i.e. likes
// TODO: Add discussion section