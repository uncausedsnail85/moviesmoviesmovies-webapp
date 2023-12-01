import axios from "axios";

export const TMDB_URL = process.env.REACT_APP_TMDB_URL;
export const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const findMovies = async (searchTerm) => {
    const url = `${TMDB_URL}/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1&api_key=${TMDB_API_KEY}`
    const response = await axios.get(
        url
    );
    console.log(JSON.stringify(response))
    return response.data.results;
  };