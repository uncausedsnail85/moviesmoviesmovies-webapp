import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as client from "../client/tmdbClient"
import * as likesClient from "../Likes/client"
import { useSelector } from "react-redux";
import { BsTrash3Fill } from "react-icons/bs";

function EditLikes() {
    const loggedInUser = useSelector((state) => state.userReducer).user;

    const { tmdbMovieId } = useParams();

    // page state
    const [movie, setMovie] = useState(null);
    const [likes, setLikes] = useState([]);
    const [addUser, setAddUser] = useState("");

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
    const removeLike = async (username, tmdbId) => {
        try {
            await likesClient.deleteUserLikesMovie(username, tmdbId);
            await getLikes(tmdbId);
        } catch (error) {
            console.error("Error removing like: ", error);
        }
    };

    const addLike = async (username, tmdbId) => {
        try {
            await likesClient.createUserLikesMovie(username, tmdbId);
            await getLikes(tmdbId);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Display the error message from the server
                alert(error.response.data.message);
            } else {
                console.error("Error liking movie:", error);
            }
        }
    }

    useEffect(() => {
        getMovieDetailsFromTmdbId(tmdbMovieId)
        getLikes(tmdbMovieId);
    }, [])

    return (<>
        <h2>Edit Likes</h2>
        {movie && (<h6>{movie.title} - ID: {movie.id}</h6>)}

        <hr />
        <label for="adduser" className="me-2 form-label">Add user like</label>
        <input
            id="adduser"
            type="text"
            className="form-control mb-3"
            placeholder={"Add user like"}
            value={addUser}
            onChange={(event) => {
                setAddUser(event.target.value);
            }}
        />
        < button className="btn btn-info me-3" onClick={() => addLike(addUser, tmdbMovieId)}>
            Add User Like
        </button>


        <hr />
        {likes && likes.map((username, index) => (
            <div class="row border-bottom ">
                <div class="col-2">
                    <Link className="me-5" to={`/profile/${username}`}>{username}</Link>
                </div>
                <div class="col-1 ">
                    <button className="btn" onClick={() => removeLike(username, tmdbMovieId)}>
                        <BsTrash3Fill
                            className="text-danger fs-6 text " />
                    </button>
                </div>
            </div>
        ))}
{/* 
        <br /><>JSON movie:</>
        <pre>{JSON.stringify(likes, null, 2)}</pre> */}
    </>)
}

export default EditLikes;