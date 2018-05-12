import '../../utils/utils'
import { fetchBegin, fetchSuccess, fetchError } from '../redux/actions/fetchActions'

export const urlApi = 'https://api-v2.hdviet.com'
export const urlHome = urlApi + '/movie/homepage'

export const urlCategory = urlApi + '/category/menu?sequence={0}'
export const urlCategoryDetail = urlApi + '/movie?categoryid={0}&offset={1}&limit={2}'

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
                dispatch(fetchSuccess())
                return responseJson.r
            })
            .catch((error) => {
                console.error('getDataAsync error ', error)
                dispatch(fetchError(error))
            })
    }
    
}

// Handle HTTP errors since fetch won't.
function getDataAsyncErrors(response) {
    if (!response.ok) {
        console.error('getDataAsync error', response)
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
