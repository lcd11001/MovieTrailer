import '../../utils/utils'
import { fetchBegin, fetchSuccess, fetchError } from '../redux/actions/fetchActions'
import { doCORSRequest } from './cors'

/*
// HDViet API
const urlApi = 'https://api-v2.hdviet.com'
const urlHome = urlApi + '/movie/homepage'

const urlCategory = urlApi + '/category/menu?sequence={0}'
const urlCategoryDetail = urlApi + '/movie?categoryid={0}&offset={1}&limit={2}'

const urlMovieDetail = urlApi + '/movie?movieid={0}'

const urlMoviePlay = 'http://netflix.com/get_movie?movieid={0}'
const urlMoviePlaySequence = urlMoviePlay + '&sequence={1}'
*/

// TheMovieDB API
const api_key = '968732b6e0bc12057a371cf45810718c'
const api_read_access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Njg3MzJiNmUwYmMxMjA1N2EzNzFjZjQ1ODEwNzE4YyIsInN1YiI6IjY1Y2U0ZjNhNmMwYjM2MDE2MjhlMDFkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NAqMIm6xQ7qk7Kn8sC9mwCf3RvawpijGndzMn92UrCo'
const response_error = 'status_message'
const response_code = 'status_code'

const time_windows = 'day'
const language = 'en-US'

const urlApi = 'https://api.themoviedb.org/3'
const urlHome = `${urlApi}/trending/all/${time_windows}?api_key=${api_key}&language=${language}`

const urlCategory = `${urlApi}/genre/{0}/list?api_key=${api_key}&language=${language}`
const urlCategoryDetail = `${urlApi}/discover/movie/?api_key=${api_key}&with_genres={0}&language=${language}&sort_by=popularity.desc&include_adult=false&include_video=false&page={1}`

const urlMovieDetail = `${urlApi}/movie/{0}?api_key=${api_key}&language=${language}`

const urlMoviePlay = `${urlApi}/movie/{0}/videos?api_key=${api_key}&language=${language}`
const urlMoviePlaySequence = `${urlApi}/movie/{0}/videos?api_key=${api_key}&language=${language}&append_to_response=videos`

// https://daveceddia.com/where-fetch-data-redux/
function getDataAsync(url, otherOptions) {
    otherOptions = otherOptions || {}

    return (dispatch) => {
        console.log('getDataAsync ' + url)
        dispatch(fetchBegin())

        let options = {
            ...otherOptions,
            method: otherOptions.method || 'GET',
            /*
            headers: new Headers({
                ...otherOptions.headers,
                accept: 'application/json',
                Authorization: 'Bearer ' + api_read_access_token,
            })
            */
        }
        // console.log('getDataAsync options', options)
        return fetch(url, options)
            .then(getDataAsyncErrors)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('getDataAsync response', responseJson[response_error])
                if (responseJson[response_code] !== 0) {
                    dispatch(fetchError(responseJson[response_error]))
                } else {
                    dispatch(fetchSuccess())
                }
                return responseJson
            })
            .catch((error) => {
                console.error('fetch error', error)
                dispatch(fetchError(error.message))
            })
    }

}

// Handle HTTP errors since fetch won't.
async function getDataAsyncErrors(response) {
    // console.log('getDataAsyncErrors', response)
    if (response.ok === false || response.status !== 200) {
        //console.error('getDataAsyncErrors error', response)

        const responseJson = await response.json()
        if (responseJson !== undefined)
        {
            console.error('getDataAsyncErrors responseJson', responseJson)
            throw Error(responseJson[response_error] || JSON.stringify(responseJson))
        }
        else
        {    
            throw Error(response.statusText)
        }
    }
    return response
}


export function getMoviesHome() {
    return getDataAsync(urlHome)
}

export function getCategory(isSeries)
{
    // HDViet API
    // let url = String.format(urlCategory, isSeries ? 1 : 0)

    // TheMovieDB API
    const url = String.format(urlCategory, isSeries ? 'tv' : 'movie')
    return getDataAsync(url)
}

export function getCategoryDetail(categoryid, offset, limit)
{
    // HDViet API
    // let url = String.format(urlCategoryDetail, categoryid, offset, limit)

    // TheMovieDB API
    const url = String.format(urlCategoryDetail, categoryid, offset)
    return getDataAsync(url)
}

export function getMovieDetail(movieID) {
    let url = String.format(urlMovieDetail, movieID)
    return getDataAsync(url)
}

export function getMoviePlay(movieID, sequence) {
    let url = sequence !== undefined
        ? String.format(urlMoviePlaySequence, movieID, sequence)
        : String.format(urlMoviePlay, movieID)

    return (dispatch) => {
        console.log('getMoviePlay ' + url)
        dispatch(fetchBegin())

        return new Promise((resolve, reject) => {
            doCORSRequest(
                // options
                {
                    method: 'GET',
                    url: url,
                    data: null
                },
                // resolve
                (response) => {
                    try {
                        let responseJson = JSON.parse(response)
                        

                        if (responseJson.error !== 0) {
                            dispatch(fetchError(responseJson.data))
                        } else {
                            dispatch(fetchSuccess())
                        }

                        resolve(responseJson.data)
                    }
                    catch (error) {
                        dispatch(fetchError(error.message))
                        reject(error.message)
                    }
                },
                // reject
                (err) => {
                    dispatch(fetchError(JSON.stringify(err)))
                    reject(err)
                }
            )
        })
    }
}

export function getImage(url) {
    // HDViet API
    // return url

    // TheMovieDB API
    return `https://image.tmdb.org/t/p/w500${url}`
}