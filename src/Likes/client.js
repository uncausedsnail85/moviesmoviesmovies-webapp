import axios from "axios";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/api/users`;
const LIKES_API = `${BASE_API}/api/likes`;

export const findAllLikes = async () => {
    const response = await axios.get(`${LIKES_API}`);
    return response.data;
};



export const createUserLikesMovie = async (username, tmdbId) => {
    const response = await axios.post(`${USERS_API}/${username}/likes/${tmdbId}`);
    return response.data
};


export const deleteUserLikesMovie = async (username, tmdbId) => {
    const response = await axios.delete(`${USERS_API}/${username}/likes/${tmdbId}`);
    return response.data;
};


export const findUsernamesThatLikeMovie = async (tmdbId) => {
    const response = await axios.get(`${LIKES_API}/${tmdbId}/users`);
    // "/api/likes/:tmdbId/users"
    return response.data
};


export const findAllMoviesUserLikes = async (username) => {
    const response = await axios.get(`${USERS_API}/${username}/likes`);
    // "/api/users/:username/likes"
    // console.log(JSON.stringify(response.data))
    return response.data
};

