import axios from "axios";

export const TMDB_URL = process.env.REACT_APP_TMDB_URL; // https://api.themoviedb.org/3
export const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

// #### MOVIES ####
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


// #### TV SHOWS ####
export const findTvShows = async (searchTerm) => {
    const url = `${TMDB_URL}/search/tv?query=${searchTerm}&include_adult=false&language=en-US&page=1&api_key=${TMDB_API_KEY}`;
    const response = await axios.get(url);
    return response.data.results;
}

export const getShowDetailsfromTmdbId = async (tmdbId) => {
    const url = `${TMDB_URL}/tv/${tmdbId}?api_key=${TMDB_API_KEY}`
    // https://api.themoviedb.org/3/tv/{series_id}
    const response = await axios.get(url);
    return response.data;
}

export const getShowCreditsfromTmdbId = async (tmdbId) => {
    const url = `${TMDB_URL}/tv/${tmdbId}/credits?api_key=${TMDB_API_KEY}&language=en-US`
    // https://api.themoviedb.org/3/tv/{series_id}/credits
    const response = await axios.get(url);
    return response.data.cast;
}

// #### COMAPNIES ####
export const findCompanies = async (searchTerm) => {
    const url = `${TMDB_URL}/search/company?query=${searchTerm}&include_adult=false&language=en-US&page=1&api_key=${TMDB_API_KEY}`;
    // https://api.themoviedb.org/3/search/company
    const response = await axios.get(url);
    return response.data.results;
}

export const getCompanyDetailsfromTmdbId = async (tmdbId) => {
    const url = `${TMDB_URL}/company/${tmdbId}?api_key=${TMDB_API_KEY}`
    // https://api.themoviedb.org/3/company/{company_id}
    const response = await axios.get(url);
    return response.data;
}

export const getMoviesFromCompanyId = async (companyId) => {
    const url = `${TMDB_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_companies=${companyId}&api_key=${TMDB_API_KEY}`
    // 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_companies=4' 
    const response = await axios.get(url);
    // console.log(`response: ${JSON.stringify(response.data)}`)
    return response.data.results;
}

export const getReviewsFromMovieId = async (tmdbId) => {
    const url = `${TMDB_URL}/movie/${tmdbId}/reviews?api_key=${TMDB_API_KEY}`
    //https://api.themoviedb.org/3/movie/{movie_id}/reviews
    const response = await axios.get(url);
    return response.data.results;
}