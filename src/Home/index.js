import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

import * as tmdbClient from "../client/tmdbClient"
import * as likesClient from "../Likes/client"
import "./index.css";

function Home() {

    const { user } = useSelector((state) => state.userReducer);
    const [trendingMovies, setTrendingMovies] = useState(null);
    const [numLikes, setNumLikes] = useState([]);


    const getTrendingMovies = async () => {
        let results = await tmdbClient.getPopularMovies();
        results = results.slice(0, 12);
        await setTrendingMovies(results);
    }

    const getNumberLikes = async () => {
        let numLikesArray = []
        if (trendingMovies) {
            for (let i = 0; i < trendingMovies.length; i++) {
                let likes = await likesClient.findUsernamesThatLikeMovie(trendingMovies[i].id);
                numLikesArray.push(likes.length);
            }
            setNumLikes(numLikesArray);
            // console.log(JSON.stringify(`numLikesArray: ${numLikesArray}`))
        }
    }

    useEffect(() => {
        getTrendingMovies();
    }, []);

    useEffect(() => {
        getNumberLikes()
    }, [trendingMovies])

    return (
        <div>

            {/* Title */}
            <div className="m3-home-container m3-home-title">
                {user == "" && <h2>Welcome to moviesmoviesmovies!</h2>}
                {user.username && <h2>Welcome back to moviesmoviesmovies!</h2>}
            </div>

            {/* about banner */}
            <div className="m3-home-container m3-annonymoususer-welcome">
                <div className="m3-annonymoususer-welcome-text">
                    See what everyone is saying about your favorite movie.
                    <br />Even the cast members.
                </div>
                <img src={`tyson-moultrie-BQTHOGNHo08-unsplash.jpg`} class="img-fluid" alt="Responsive image" />
            </div>

            {/* TRENDING */}
            <div className="m3-home-container ">
                {user == "" && <h2>Check out trending shows</h2>}
                {user.username && <h2>Today's Trending</h2>}
                <div className="d-flex flex-wrap m3-trending justify-content-center">
                    {trendingMovies && trendingMovies.map((trendingMovie, index) => (
                        <div class="card m3-trending-card">
                            <div class="card-body text-truncate" style={{ maxWidth: 186 }}>
                                <Link key={trendingMovies.id} to={`/details/${trendingMovie.id}`} className="card-link">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w154/${trendingMovie.poster_path}`}
                                        alt={trendingMovie.title}
                                    />
                                    <br />
                                    {trendingMovie.title} <br />


                                    {/* <button>Likes</button> */}
                                    <span class="badge bg-success m3-trendingbadge">{numLikes[index]} Likes</span>
                                    {/* <span class="badge bg-success m3-trendingbadge">0 Discussions</span> */}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* User's likes and discussions */}
            {/* {user != "" && (
                <div>
                    <h2>Your Likes</h2>
                    <h2>Your Discussions</h2>
                </div>
            )} */}
        </div>
    )
}

export default Home;

// TODO: ADD USER'S LIKES AND DISCUSSIONS
// TODO: 