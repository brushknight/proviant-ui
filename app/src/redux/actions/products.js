import axios from "axios";

export const ACTION_FETCH_PRODUCTS_SUCCESS = 'fetch/products/success'
export const ACTION_FETCH_PRODUCTS_FAIL = 'fetch/products/fail'
export const ACTION_FETCH_PRODUCTS_LOADING = 'fetch/products/loading'

const fetchProductLoading = () => {
    return {
        type: ACTION_FETCH_PRODUCTS_LOADING,
    }
}

const fetchProductFail = error => {
    return {
        type: ACTION_FETCH_PRODUCTS_FAIL,
        error: error
    }
}

const fetchProductSuccess = payload => {
    return {
        type: ACTION_FETCH_PRODUCTS_SUCCESS,
        payload: payload
    }
}

export const fetchProducts = () => {
    return (dispatch) => {
        dispatch(fetchProductLoading())
        axios.get("http://localhost:8080/api/v1/product/", {
            headers: {
            },
        })
            .then(response => {
                const data = response.data
                dispatch(fetchProductSuccess(data.data))
            })
            .catch(error => {
                const errorMsq = error.message
                dispatch(fetchProductFail(errorMsq))
            })
    }
}