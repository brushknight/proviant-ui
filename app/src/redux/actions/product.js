import axios from "axios";

export const ACTION_FETCH_PRODUCT_SUCCESS = 'fetch/product/success'
export const ACTION_FETCH_PRODUCT_FAIL = 'fetch/product/fail'
export const ACTION_FETCH_PRODUCT_NOT_FOUND = 'fetch/product/not_found'
export const ACTION_FETCH_PRODUCT_LOADING = 'fetch/product/loading'

const fetchProductLoading = () => {
    return {
        type: ACTION_FETCH_PRODUCT_LOADING,
    }
}

const fetchProductFail = error => {
    return {
        type: ACTION_FETCH_PRODUCT_FAIL,
        error: error
    }
}
const fetchProductNotFound = error => {
    return {
        type: ACTION_FETCH_PRODUCT_NOT_FOUND,
        error: error
    }
}

const fetchProductSuccess = model => {
    return {
        type: ACTION_FETCH_PRODUCT_SUCCESS,
        model: model
    }
}

export const fetchProduct = (id) => {
    return (dispatch) => {
        dispatch(fetchProductLoading())
        axios.get("/api/v1/product/" + id +"/", {
            headers: {
            },
        })
            .then(response => {
                const data = response.data
                dispatch(fetchProductSuccess(data.data))
            })
            .catch(error => {
                const errorMsq = error.message
                if (error.response.status === 404){
                    dispatch(fetchProductNotFound(error.response.data.error))
                }else{
                    dispatch(fetchProductFail(errorMsq))
                }
            })
    }
}