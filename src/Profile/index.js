import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as client from "../client/userClient";
import * as likesClient from "../Likes/client"
import * as tmdbClient from "../client/tmdbClient"
import "./index.css";

// shows the profile page of a particular user
function Profile() {

    const navigate = useNavigate();

    const pageUsername = useParams().username;
    const loggedInUser = useSelector((state) => state.userReducer).user; // get logged in state
    const [pageUser, setPageUser] = useState(null);
    const [pageOwnerFlag, setPageOwnerFlag] = useState()
    const [likedMovieIds, setlikedMovieIds] = useState();
    const [likedMoviesObjects, setLikedMoviesObjects] = useState([]);

    const getPageUser = async () => {
        if (pageUsername == loggedInUser.username) {
            setPageUser(loggedInUser);
            setPageOwnerFlag(true);
        } else {
            const results = await client.findUserByUsername(pageUsername);
            setPageUser(results);
            setPageOwnerFlag(false);
        }
    }

    const getlikedMovieIds = async () => {
        if (!pageUser) {
            return;
        }
        const results = await likesClient.findAllMoviesUserLikes(pageUsername);
        setlikedMovieIds(results);
    }

    const getLikedMovieObjects = async () => {
        let objArray = [];
        if (likedMovieIds) {
            for (let i = 0; i < likedMovieIds.length; i++) {
                let movie = await tmdbClient.getMovieDetailsfromTmdbId(likedMovieIds[i].tmdbId)
                objArray.push(movie);
            }
            setLikedMoviesObjects(objArray);
        }
    }


    useEffect(() => {
        getPageUser();
    }, [pageUsername])
    useEffect(() => {
        getlikedMovieIds();
    }, [pageUser])
    useEffect(() => {
        getLikedMovieObjects()
    }, [likedMovieIds])

    return (
        <>
            <h2>Profile</h2>
            {pageUser && <>
                <div class="row align-items-center m3-profile-row">
                    <div class="col-2 m3-profile-col1">
                        Username:</div>
                    <div class="col-10 col-sm-7 col-xl-6" >
                        {pageUser.username}</div>
                </div>
                <div class="row align-items-center m3-profile-row">
                    <div class="col-2 m3-profile-col1">
                        First name:</div>
                    <div class="col-10 col-sm-7 col-xl-6" >
                        {pageUser.firstName}</div>
                </div>
                <div class="row align-items-center m3-profile-row">
                    <div class="col-2 m3-profile-col1">
                        Last name:</div>
                    <div class="col-10 col-sm-7 col-xl-6" >
                        {pageUser.lastName}</div>
                </div>
            </>}

            {pageUser && loggedInUser.username === pageUsername &&
                <div class="row align-items-center m3-profile-row">
                    <div class="col-2 m3-profile-col1">
                        Email:</div>
                    <div class="col-10 col-sm-7 col-xl-6" >
                        {pageUser.email}</div>
                </div>}

            {loggedInUser != "" && loggedInUser.username === pageUsername && (
                <div className="p-3">
                    <button
                        className="btn btn-info ms-3" type="submit"
                        onClick={() => navigate(`/profile/settings`)}>
                        Edit Profile</button>
                    <button
                        className="btn btn-warning ms-3" type="submit"
                        onClick={() => navigate(`/signout`)}>
                        Sign Out</button>
                    {loggedInUser && loggedInUser.role === "ADMIN" &&
                        <button
                            className="btn btn-danger ms-3" type="submit"
                            onClick={() => navigate(`/profile/usertable`)}>
                            User Table</button>
                    }
                </div>)}

            <h2 className="pt-3">Likes</h2>

            {/* <pre>{JSON.stringify(likedMovieIds, null, 2)}</pre>
            <pre>{JSON.stringify(likedMoviesObjects, null, 2)}</pre> */}
            <ul className="list-group">
                {
                    likedMoviesObjects.map((likedMovie, index) => {
                        return (
                            <li key={index} className="list-group-item d-flex flex-row ">
                                <div className="p-2">
                                    {likedMovie.poster_path && <img
                                        src={`https://image.tmdb.org/t/p/w92/${likedMovie.poster_path}`}
                                        alt={likedMovie.title}
                                    />}
                                </div>
                                <div className="p-2">
                                    <h4><Link to={`/details/${likedMovie.id}`}> {likedMovie.title}</Link></h4>
                                    Released: {likedMovie.release_date}
                                    <br />
                                    {likedMovie.overview}
                                </div>
                            </li>)
                    })}
            </ul>
            {/* <>JSON ccurrent logged in user:</>
            <pre>{JSON.stringify(loggedInUser, null, 2)}</pre> */}
        </>
    )
}

export default Profile;

// TODO: Check if user exists, if not dont show page
// TODO: grab discussions and likes
// TODO: allow admin to edit profile