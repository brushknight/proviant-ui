import axios from "axios";
import {
    ACTION_CHANGE_PRODUCT_EDIT_FORM_FIELD,
    ACTION_CREATE_PRODUCT_SUCCESS,
    ACTION_DELETE_PRODUCT_FAIL,
    ACTION_DELETE_PRODUCT_LOADING,
    ACTION_DELETE_PRODUCT_SUCCESS,
    ACTION_FETCH_PRODUCT_FAIL, ACTION_FETCH_PRODUCT_FORM_SUCCESS,
    ACTION_FETCH_PRODUCT_LOADING,
    ACTION_FETCH_PRODUCT_NOT_FOUND,
    ACTION_FETCH_PRODUCT_SUCCESS,
    ACTION_RESET_PRODUCT,
    ACTION_UPDATE_PRODUCT_FAIL,
    ACTION_UPDATE_PRODUCT_LOADING,
    ACTION_UPDATE_PRODUCT_SUCCESS
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
const createProductSuccess = (model) => {
    return {
        type: ACTION_CREATE_PRODUCT_SUCCESS,
        model: model
    }
}
const updateProductFail = (error) => {
    return {
        type: ACTION_UPDATE_PRODUCT_FAIL,
        error: error
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

export const changeProductField = (field, value) => {
    return {
        type: ACTION_CHANGE_PRODUCT_EDIT_FORM_FIELD,
        field: field,
        value: value
    }
}

export const resetProduct = () => {
    return {
        type: ACTION_RESET_PRODUCT
    }
}

export const fetchProduct = (id, isForm) => {
    return (dispatch) => {
        dispatch(fetchProductLoading())
        axios.get("/api/v1/product/" + id + "/", {
            headers: {},
        })
            .then(response => {
                const data = response.data
                if (isForm){
                    dispatch(fetchProductFormSuccess(data.data))
                }else{
                    dispatch(fetchProductSuccess(data.data))
                }
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

export const updateProduct = (model) => {
    return (dispatch) => {
        dispatch(updateProductLoading())
        const json = JSON.stringify(model);
        axios.put(`/api/v1/product/${model.id}/`, json)
            .then(response => {
                const data = response.data
                dispatch(updateProductSuccess(data.data))

            })
            .catch(error => {
                const errorMsq = error.message
                dispatch(updateProductFail(errorMsq))
            })
    }
}

export const createProduct = (model) => {
    return (dispatch) => {
        dispatch(updateProductLoading())
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
                    dispatch(updateProductFail(error.response.data.error))
                } else {
                    dispatch(updateProductFail(errorMsq))
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
