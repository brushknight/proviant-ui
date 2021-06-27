import {
    ACTION_FETCH_PRODUCT_FAIL,
    ACTION_FETCH_PRODUCT_LOADING, ACTION_FETCH_PRODUCT_NOT_FOUND,
    ACTION_FETCH_PRODUCT_SUCCESS
} from "../actions/product";

export const STATUS_LOADING = "loading"
export const STATUS_LOADED = "loaded"
export const STATUS_ERROR = "error"
export const STATUS_NOT_FOUND = "not_found"
export const STATUS_DEFAULT = "default"

const initialState = {
    model: {
        "id": null,
        "title": null,
        "description": null,
        "link": null,
        "image": null,
        "barcode": null,
        "category_ids": [],
        "categories": [],
        "list_id": null,
        "list": null,
    },
    status: STATUS_DEFAULT,
    error: null
}

export default function (state = initialState, action) {

    switch (action.type) {
        case ACTION_FETCH_PRODUCT_FAIL:
            return {
                ...state,
                error: action.error,
                status: STATUS_ERROR
            }
        case ACTION_FETCH_PRODUCT_NOT_FOUND:
            return {
                ...state,
                error: action.error,
                status: STATUS_NOT_FOUND
            }
        case ACTION_FETCH_PRODUCT_LOADING:
            return {
                ...state,
                status: STATUS_LOADING,
                error: null
            }

        case ACTION_FETCH_PRODUCT_SUCCESS:
            return {
                ...state,
                model: action.model,
                status: STATUS_LOADED,
                error: null
            }
        default:
            return state;
    }
}

