import axios from "axios";
import {
    ACTION_CHANGE_PRODUCT_EDIT_FORM_FIELD,
    ACTION_CREATE_PRODUCT_SUCCESS,
    ACTION_DELETE_PRODUCT_FAIL,
    ACTION_DELETE_PRODUCT_LOADING,
    ACTION_DELETE_PRODUCT_SUCCESS,
    ACTION_EDIT_PRODUCT_FAIL,
    ACTION_EDIT_PRODUCT_FETCHED,
    ACTION_EDIT_PRODUCT_FETCHING, ACTION_EDIT_PRODUCT_SENDING,
    ACTION_EDIT_PRODUCT_SUCCESS,
    ACTION_FETCH_PRODUCT_FAIL,
    ACTION_FETCH_PRODUCT_FORM_SUCCESS,
    ACTION_FETCH_PRODUCT_LOADING,
    ACTION_FETCH_PRODUCT_NOT_FOUND,
    ACTION_FETCH_PRODUCT_SUCCESS,
    ACTION_RESET_PRODUCT
} from "./const";


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
const fetchProductFormSuccess = model => {
    return {
        type: ACTION_FETCH_PRODUCT_FORM_SUCCESS,
        model: model
    }
}

const createProductSuccess = (model) => {
    return {
        type: ACTION_CREATE_PRODUCT_SUCCESS,
        model: model
    }
}

const deleteProductSuccess = (model) => {
    return {
        type: ACTION_DELETE_PRODUCT_SUCCESS,
        model: model
    }
}
const deleteProductFail = (error) => {
    return {
        type: ACTION_DELETE_PRODUCT_FAIL,
        error: error
    }
}

const deleteProductLoading = () => {
    return {
        type: ACTION_DELETE_PRODUCT_LOADING,
    }
}

export const resetProduct = () => {
    return {
        type: ACTION_RESET_PRODUCT
    }
}

export const fetchProduct = (id) => {
    return (dispatch) => {
        dispatch(fetchProductLoading())
        axios.get("/api/v1/product/" + id + "/", {
            headers: {},
        })
            .then(response => {
                const data = response.data
                dispatch(fetchProductSuccess(data.data))
            })
            .catch(error => {
                const errorMsq = error.message
                if (error.response.status === 404) {
                    dispatch(fetchProductNotFound(error.response.data.error))
                } else {
                    dispatch(fetchProductFail(errorMsq))
                }
            })
    }
}



export const createProduct = (model) => {
    return (dispatch) => {
        dispatch(editProductSending())
        const json = JSON.stringify(model);
        axios.post(`/api/v1/product/`, json)
            .then(response => {
                const data = response.data
                dispatch(createProductSuccess(data.data))

            })
            .catch(error => {
                const errorMsq = error.message
                if (error.response.status === 404) {
                    dispatch(fetchProductNotFound(error.response.data.error))
                } else if (error.response.status) {
                    dispatch(editProductFail(error.response.data.error))
                } else {
                    dispatch(editProductFail(errorMsq))
                }
            })
    }
}

export const deleteProduct = (id) => {
    return (dispatch) => {
        dispatch(deleteProductLoading())
        axios.delete(`/api/v1/product/${id}/`)
            .then(response => {
                const data = response.data
                dispatch(deleteProductSuccess())

            })
            .catch(error => {
                const errorMsq = error.message
                dispatch(deleteProductFail(errorMsq))
            })
    }
}
