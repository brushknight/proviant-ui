import axios from "axios";
import {
    ACTION_CHANGE_PRODUCT_EDIT_FORM_FIELD,
    ACTION_EDIT_PRODUCT_FAIL,
    ACTION_EDIT_PRODUCT_FETCHED,
    ACTION_EDIT_PRODUCT_FETCHING,
    ACTION_EDIT_PRODUCT_SENDING,
    ACTION_EDIT_PRODUCT_SUCCESS
} from "./const";


const editProductSending = () => {
    return {
        type: ACTION_EDIT_PRODUCT_SENDING,
    }
}
const editProductSuccess = (model) => {
    return {
        type: ACTION_EDIT_PRODUCT_SUCCESS,
        model: model
    }
}
const editProductFetching = () => {
    return {
        type: ACTION_EDIT_PRODUCT_FETCHING,
    }
}
const editProductFetched = (model) => {
    return {
        type: ACTION_EDIT_PRODUCT_FETCHED,
        model: model
    }
}
const editProductFail = (error) => {
    return {
        type: ACTION_EDIT_PRODUCT_FAIL,
        error: error
    }
}
export const editProductFormChangeField = (field, value) => {
    return {
        type: ACTION_CHANGE_PRODUCT_EDIT_FORM_FIELD,
        field: field,
        value: value
    }
}

export const fetchEditProduct = (id) => {
    return (dispatch) => {
        dispatch(editProductFetching())
        axios.get("/api/v1/product/" + id + "/", {
            headers: {},
        })
            .then(response => {
                const data = response.data
                dispatch(editProductFetched(data.data))
            })
            .catch(error => {
                const errorMsq = error.message
                if (error.response.status === 404) {
                    dispatch(editProductFail(error.response.data.error))
                } else {
                    dispatch(editProductFail(errorMsq))
                }
            })
    }
}

export const updateProduct = (model) => {
    return (dispatch) => {
        dispatch(editProductSending())
        const json = JSON.stringify(model);
        axios.put(`/api/v1/product/${model.id}/`, json)
            .then(response => {
                const data = response.data
                dispatch(editProductSuccess(data.data))

            })
            .catch(error => {
                const errorMsq = error.message
                dispatch(editProductFail(errorMsq))
            })
    }
}