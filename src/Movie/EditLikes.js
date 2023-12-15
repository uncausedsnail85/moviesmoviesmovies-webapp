import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as client from "../client/tmdbClient"
import * as likesClient from "../Likes/client"
import { useSelector } from "react-redux";

function EditLikes() {
    const loggedInUser = useSelector((state) => state.userReducer).user;

    const { tmdbMovieId } = useParams();

    // page state
    const [movie, setMovie] = useState(null);
    const [likes, setLikes] = useState([]);

    const getLikes = async (tmdbId) => {
        const results = await likesClient.findUsernamesThatLikeMovie(tmdbId);
        const flatResult = results.map(obj => obj.username);
        setLikes(flatResult);
    }

    // ### api calls ###
    const getMovieDetailsFromTmdbId = async (tmdbMovieId) => {
        const results = await client.getMovieDetailsfromTmdbId(tmdbMovieId);
        setMovie(results);
    }

    useEffect(() => {
        getMovieDetailsFromTmdbId(tmdbMovieId)
        getLikes(tmdbMovieId);
    }, [])

    return (<>
        <h2>Edit Likes</h2>
        {/* <h4>{movie.title} - {movie.id}</h4> */}
        <>JSON movie:</>
        <pre>{JSON.stringify(movie, null, 2)}</pre>
    </>)
}

export default EditLikes;