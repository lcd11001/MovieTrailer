import '../../utils/utils'
import { fetchBegin, fetchSuccess, fetchError } from '../redux/actions/fetchActions'

const urlApi = 'https://api-v2.hdviet.com'
const urlHome = urlApi + '/movie/homepage'

const urlCategory = urlApi + '/category/menu?sequence={0}'
const urlCategoryDetail = urlApi + '/movie?categoryid={0}&offset={1}&limit={2}'

const urlMovieDetail = urlApi + '/movie?movieid={0}'

// https://daveceddia.com/where-fetch-data-redux/
function getDataAsync(url) {
    return (dispatch) => {
        // console.log('getDataAsync ' + url)
        dispatch(fetchBegin())

        return fetch(url)
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