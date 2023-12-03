import axios from "axios";

export const TMDB_URL = process.env.REACT_APP_TMDB_URL; // https://api.themoviedb.org/3
export const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const findMovies = async (searchTerm) => {
    const url = `${TMDB_URL}/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1&api_key=${TMDB_API_KEY}`
    const response = await axios.get(
        url
    );
    // console.log(JSON.stringify(response))
    return response.data.results;
};

export const getMovieDetailsfromTmdbId = async (tmdbId) => {
    const url = `${TMDB_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}`
    const response = await axios.get(url);
    return response.data;
}

export const getMovieCreditsfromTmdbId = async (tmdbId) => {
    const url = `${TMDB_URL}/movie/${tmdbId}/credits?api_key=${TMDB_API_KEY}&language=en-US`
    // 'https://api.themoviedb.org/3/movie/258480/credits?language=en-US'
    const response = await axios.get(url);
    return response.data.cast;
}

export const getPopularMovies = async () => {
    const url = `${TMDB_URL}/movie/popular?language=en-US&page=1&api_key=${TMDB_API_KEY}`;
    const response = await axios.get(url);
    return response.data.results;   
}