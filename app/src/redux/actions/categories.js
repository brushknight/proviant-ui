import axios from "axios";

export const ACTION_FETCH_CATEGORIES_SUCCESS = 'fetch/categories/success'
export const ACTION_FETCH_CATEGORIES_FAIL = 'fetch/categories/fail'
export const ACTION_FETCH_CATEGORIES_LOADING = 'fetch/categories/loading'

const fetchCategoriesLoading = () => {
    return {
        type: ACTION_FETCH_CATEGORIES_LOADING,
    }
}

const fetchCategoriesFail = error => {
    return {
        type: ACTION_FETCH_CATEGORIES_FAIL,
        error: error
    }
}

const fetchCategoriesSuccess = payload => {
    return {
        type: ACTION_FETCH_CATEGORIES_SUCCESS,
        payload: payload
    }
}

export const fetchCategories = () => {
    return (dispatch) => {
        dispatch(fetchCategoriesLoading())
        axios.get("http://localhost:8080/api/v1/category/", {
            headers: {
            },
        })
            .then(response => {
                const data = response.data
                dispatch(fetchCategoriesSuccess(data.data))
            })
            .catch(error => {
                const errorMsq = error.message
                dispatch(fetchCategoriesFail(errorMsq))
            })
    }
}