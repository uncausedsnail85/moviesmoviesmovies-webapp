import axios from "axios";

const REACT_APP_BASE_API_URL = "http://localhost:4000/api";



const USERS_API = `${REACT_APP_BASE_API_URL}/users`;

const LIKES_API = `${REACT_APP_BASE_API_URL}/likes`;

export const findAllLikes = async () => {};


export const createUserLikesMovie = async (username, tmdbId) => {
    const response = await axios.post(`${USERS_API}/${username}/likes/${tmdbId}`);
    return response.data
};
    

export const deleteUserLikesMovie = async (username, tmdbId) => {};


export const findUsersThatLikeMovie = async (tmdbId) => {};


export const findAllMoviesUserLikes = async (username) => {};

