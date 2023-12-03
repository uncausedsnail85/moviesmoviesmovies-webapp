import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

import * as tmdbClient from "../client/tmdbClient"
import "./index.css";

function Home() {

    const { user } = useSelector((state) => state.userReducer);
    const [trendingMovies, setTrendingMovies] = useState(null);

    const getTrendingMovies = async () => {
        const results = await tmdbClient.getPopularMovies();
        setTrendingMovies(results.slice(0, 6));
    }

    useEffect(() => {
        getTrendingMovies();
    }, []);

    return (
        <div>

            {/* Title */}
            <div className="m3-home-container m3-home-title">
                {user == "" && <h2>Welcome to moviesmoviesmovies!</h2>}
                {user != "" && <h2>Welcome back to moviesmoviesmovies!</h2>}
            </div>

            {/* about banner */}
            <div className="m3-home-container m3-annonymoususer-welcome">
                <div className="m3-annonymoususer-welcome-text">
                    See what everyone is talking about your favorite movie.
                    <br />Even the cast members.
                </div>
                <img src={`pexels-lucas-pezeta-2398354.jpg`} class="img-fluid" alt="Responsive image" />
            </div>

            {/* TRENDING */}
            <div className="m3-home-container ">
                {user == "" && <h2>Check out trending shows</h2>}
                {user != "" && <h2>Today's Trending</h2>}
                <div className="d-flex flex-wrap m3-trending justify-content-center">
                    {trendingMovies && trendingMovies.map((trendingMovie) => (
                        <div class="card wd-dashboard-card">
                            <div class="card-body text-truncate" style={{ maxWidth: 186 }}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w154/${trendingMovie.poster_path}`}
                                    alt={trendingMovie.title}
                                />
                                <br />
                                {trendingMovie.title} <br />
                                <span class="badge bg-success m3-trendingbadge">0 Likes</span>
                                <span class="badge bg-success m3-trendingbadge">0 Discussions</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* User's likes and discussions */}
            {user != "" && (
                <div>
                    <h2>Your Likes</h2>
                    <h2>Your Discussions</h2>
                </div>
            )}
        </div>
    )
}

export default Home;