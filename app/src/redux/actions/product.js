import axios from "axios";

export const ACTION_FETCH_PRODUCT_SUCCESS = 'fetch/product/success'
export const ACTION_FETCH_PRODUCT_FAIL = 'fetch/product/fail'
export const ACTION_FETCH_PRODUCT_NOT_FOUND = 'fetch/product/not_found'
export const ACTION_FETCH_PRODUCT_LOADING = 'fetch/product/loading'

export const ACTION_UPDATE_PRODUCT_LOADING = 'update/product/loading'
export const ACTION_UPDATE_PRODUCT_SUCCESS = 'update/product/success'
export const ACTION_UPDATE_PRODUCT_FAIL = 'update/product/fail'

export const ACTION_CHANGE_PRODUCT_FIELD = 'change/product/field'

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

const updateProductLoading = () => {
    return {
        type: ACTION_UPDATE_PRODUCT_LOADING,
    }
}
const updateProductSuccess = (model) => {
    return {
        type: ACTION_UPDATE_PRODUCT_SUCCESS,
        model: model
    }
}
const updateProductFail = (error) => {
    return {
        type: ACTION_UPDATE_PRODUCT_FAIL,
        error: error
    }
}

export const changeProductField = (field, value) => {
    return {
        type: ACTION_CHANGE_PRODUCT_FIELD,
        field: field,
        value: value
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

export const updateProduct = (model) => {
    return (dispatch) => {
        dispatch(updateProductLoading())
        const json = JSON.stringify(model);
        axios.put(`/api/v1/product/${model.id}/`, json)
            .then(response => {
                const data = response.data
                dispatch(updateProductSuccess(data.data))
                console.log(data.data)

            })
            .catch(error => {
                const errorMsq = error.message
                dispatch(updateProductFail(errorMsq))
            })
    }
}