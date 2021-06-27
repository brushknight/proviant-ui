import {
    ACTION_CHANGE_PRODUCT_FIELD,
    ACTION_FETCH_PRODUCT_FAIL,
    ACTION_FETCH_PRODUCT_LOADING,
    ACTION_FETCH_PRODUCT_NOT_FOUND,
    ACTION_FETCH_PRODUCT_SUCCESS,
    ACTION_UPDATE_PRODUCT_FAIL,
    ACTION_UPDATE_PRODUCT_LOADING,
    ACTION_UPDATE_PRODUCT_SUCCESS
} from "../actions/product";

export const STATUS_LOADING = "loading"
export const STATUS_UPDATED = "updated"
export const STATUS_LOADED = "loaded"
export const STATUS_ERROR = "error"
export const STATUS_NOT_FOUND = "not_found"
export const STATUS_DEFAULT = "default"

export const PRODUCT_FIELD_ID = 'id'
export const PRODUCT_FIELD_TITLE = 'title'
export const PRODUCT_FIELD_DESCRIPTION = 'description'
export const PRODUCT_FIELD_LINK = 'link'
export const PRODUCT_FIELD_IMAGE = 'image'
export const PRODUCT_FIELD_BARCODE = 'barcode'
export const PRODUCT_FIELD_CATEGORY_IDS = 'category_ids'
export const PRODUCT_FIELD_CATEGORIES = 'categories'
export const PRODUCT_FIELD_LIST_IDS = 'list_id'
export const PRODUCT_FIELD_LIST = 'list'

const emptyModel = {
    PRODUCT_FIELD_ID: null,
    PRODUCT_FIELD_TITLE: null,
    PRODUCT_FIELD_DESCRIPTION: null,
    PRODUCT_FIELD_LINK: null,
    PRODUCT_FIELD_IMAGE: null,
    PRODUCT_FIELD_BARCODE: null,
    PRODUCT_FIELD_CATEGORY_IDS: [],
    PRODUCT_FIELD_CATEGORIES: [],
    PRODUCT_FIELD_LIST_IDS: null,
    PRODUCT_FIELD_LIST: null,
}

const initialState = {
    model: emptyModel,
    formStatus: STATUS_DEFAULT,
    status: STATUS_DEFAULT,
    error: null
}

export default function (state = initialState, action) {

    switch (action.type) {
        case ACTION_FETCH_PRODUCT_FAIL:
            return {
                ...state,
                error: action.error,
                status: STATUS_ERROR,
                formStatus: STATUS_DEFAULT,
            }
        case ACTION_FETCH_PRODUCT_NOT_FOUND:
            return {
                ...state,
                error: action.error,
                status: STATUS_NOT_FOUND,
                formStatus: STATUS_DEFAULT,
            }
        case ACTION_FETCH_PRODUCT_LOADING:
            return {
                ...state,
                status: STATUS_LOADING,
                error: null,
                formStatus: STATUS_DEFAULT,
            }

        case ACTION_FETCH_PRODUCT_SUCCESS:
            return {
                ...state,
                model: action.model,
                status: STATUS_LOADED,
                error: null,
                formStatus: STATUS_DEFAULT,
            }
        case ACTION_UPDATE_PRODUCT_LOADING:
            return {
                ...state,
                formStatus: STATUS_LOADING,
                error: null,
                status: STATUS_DEFAULT
            }
        case ACTION_UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                formStatus: STATUS_ERROR,
                error: action.error,
                status: STATUS_DEFAULT
            }
        case ACTION_UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                formStatus: STATUS_UPDATED,
                error: null,
                status: STATUS_DEFAULT,
                model: action.model
            }
        case ACTION_CHANGE_PRODUCT_FIELD:

            let model = state.model
            model[action.field] = action.value

            return {
                ...state,
                formStatus: STATUS_DEFAULT,
                error: null,
                status: STATUS_DEFAULT,
                model: model
            }
        default:
            return state;
    }
}

