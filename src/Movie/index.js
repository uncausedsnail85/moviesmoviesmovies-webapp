import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as client from "../tmdbClient"

// component displaying the details of a movie
// should have tmdbMovieId param
function Movie() {

    const { tmdbMovieId } = useParams();

    // page state
    const [movie, setMovie] = useState(null);
    const [movieCredits, setMovieCredits] = useState([])

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


    return (
        <>
            <h1>Movie Page</h1>
            {movie && (
                <div>
                    <h2>{movie.title}</h2>
                    <h3>Dir: {movie.director}</h3>
                    <div className="row">
                        <div className="col-4">
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt={movie.title}
                                className="img-fluid"
                            />
                        </div>
                        <div className="col-8">
                            <div className="row">
                                {movie.overview}
                            </div>
                            <div className="row">
                                Genres: {movie.genres.map((genre) => genre.name).join(', ')}
                            </div>
                            <div className="row">
                                Likes:0
                            </div>
                            <div className="row cast">
                                Cast: {movieCredits.map(cast => cast.name).join(', ')}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <>JSON movie:</>
            <pre>{JSON.stringify(movie, null, 2)}</pre>
        </>
    )
}

export default Movie;