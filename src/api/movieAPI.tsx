import axios from 'axios'
import {apiKey} from '../constants/api_key'

// api base URL
const apiBaseURL = `https://api.themoviedb.org/3/`

////////////////// 
// endpoints
///////////////// 

// trending movies
const trendingMoviesEndpoint = `${apiBaseURL}/trending/movie/day?api_key=${apiKey}`
// upcoming movies
const upcomingMoviesEndpoint = `${apiBaseURL}/movie/upcoming?api_key=${apiKey}`
// top rated
const topRatedMoviesEndpoint = `${apiBaseURL}/movie/top_rated?api_key=${apiKey}`

// search endpoint
const searchEndpoint = `${apiBaseURL}/search/movie?api_key=${apiKey}`

// dynamic endpoints
const movieDetailsEndpoint = (id: number) => `${apiBaseURL}/movie/${id}?api_key=${apiKey}`
const movieCreditsEndpoint = (id: number) => `${apiBaseURL}/movie/${id}/credits?api_key=${apiKey}`
const similarMoviesEndpoint = (id: number) => `${apiBaseURL}/movie/${id}/similar?api_key=${apiKey}`

// person endpoints
const personDetailsEndpoint = (id: number) => `${apiBaseURL}/person/${id}?api_key=${apiKey}`
const personMoviesEndpoint = (id: number) => `${apiBaseURL}/person/${id}/movie_credits?api_key=${apiKey}`

// image URL 
export const image500 = (path: any) => path? `https://image.tmdb.org/t/p/w500${path}` : null
export const image342 = (path: any) => path? `https://image.tmdb.org/t/p/w342${path}` : null
export const image185 = (path: any) => path? `https://image.tmdb.org/t/p/w185${path}` : null


// fallback images
export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

///////////////////
// API functions
///////////////////

// get API
const getAPI = async (endpoint: string, params: any) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params? params : {},
    }
// try-catch
    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.log("error", error)
    }
}

//////////////////
// functions to fetch data
//////////////////

// fetch trending movies
export const fetchTrendingMovies = () => {
    return getAPI(trendingMoviesEndpoint, {})
}

// fetch upcoming movies
export const fetchUpcomingMovies = () => {
    return getAPI(upcomingMoviesEndpoint, {})
}

// fetch top-rated movies
export const fetchTopRatedMovies = () => {
    return getAPI(topRatedMoviesEndpoint, {})
}

// fetch movie details
export const fetchMovieDetails = (id: any) => {
    return getAPI(movieDetailsEndpoint(id), {})
}

// fetch movie credits
export const fetchMovieCredits = (id: any) => {
    return getAPI(movieCreditsEndpoint(id), {})
}

// fetch similar movies
export const fetchSimilarMovies = (id: any) => {
    return getAPI(similarMoviesEndpoint(id), {})
}

// fetch person details
export const fetchPersonDetails = (id: any) => {
    return getAPI(personDetailsEndpoint(id), {})
}

// fetch person movies
export const fetchPersonMovies = (id: any) => {
    return getAPI(personMoviesEndpoint(id), {})
}

// fetch search movies
export const fetchSearchMovies = (params: any) => {
    return getAPI(searchEndpoint, params)
}
