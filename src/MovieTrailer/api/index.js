import '../../utils/utils'
import { fetchBegin, fetchSuccess, fetchError } from '../redux/actions/fetchActions'
import { doCORSRequest } from './cors'

const urlApi = 'https://api-v2.hdviet.com'
const urlHome = urlApi + '/movie/homepage'

const urlCategory = urlApi + '/category/menu?sequence={0}'
const urlCategoryDetail = urlApi + '/movie?categoryid={0}&offset={1}&limit={2}'

const urlMovieDetail = urlApi + '/movie?movieid={0}'


const urlMoviePlay = 'http://netflix.com/get_movie?movieid={0}'
const urlMoviePlaySequence = urlMoviePlay + '&sequence={1}'

// https://daveceddia.com/where-fetch-data-redux/
function getDataAsync(url, otherOptions) {
    otherOptions = otherOptions || {}

    return (dispatch) => {
        console.log('getDataAsync ' + url)
        dispatch(fetchBegin())

        let options = {
            ...otherOptions,
            method: otherOptions.method || 'GET',
        }
        // console.log('getDataAsync options', options)
        return fetch(url, options)
            .then(getDataAsyncErrors)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log('getDataAsync response', responseJson.r)
                if (responseJson.e !== 0) {
                    dispatch(fetchError(responseJson.r))
                } else {
                    dispatch(fetchSuccess())
                }
                return responseJson.r
            })
            .catch((error) => {
                console.error('fetch error', error)
                dispatch(fetchError(error.message))
            })
    }

}

// Handle HTTP errors since fetch won't.
function getDataAsyncErrors(response) {
    // console.log('getDataAsyncErrors', response)
    if (!response.ok) {
        console.error('getDataAsyncErrors error', response)
        throw Error(response.statusText)
    }
    return response
}


export function getMoviesHome() {
    return getDataAsync(urlHome)
}

export function getCategory(isSeries) {
    let url = String.format(urlCategory, isSeries ? 1 : 0)
    return getDataAsync(url)
}

export function getCategoryDetail(categoryid, offset, limit) {
    let url = String.format(urlCategoryDetail, categoryid, offset, limit)
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
                        resolve()

                        if (responseJson.error !== 0) {
                            dispatch(fetchError(responseJson.data))
                        } else {
                            dispatch(fetchSuccess())
                        }

                        return responseJson.data
                    }
                    catch (error) {
                        reject()
                        dispatch(fetchError(error.message))
                    }

                    return {}
                },
                // reject
                (err) => {
                    reject()
                    dispatch(fetchError(JSON.stringify(err)))
                }
            )
        })
    }
}