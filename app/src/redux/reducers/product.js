import {
    ACTION_CHANGE_PRODUCT_FIELD, ACTION_CREATE_PRODUCT_SUCCESS,
    ACTION_FETCH_PRODUCT_FAIL,
    ACTION_FETCH_PRODUCT_LOADING,
    ACTION_FETCH_PRODUCT_NOT_FOUND,
    ACTION_FETCH_PRODUCT_SUCCESS, ACTION_RESET_PRODUCT,
    ACTION_UPDATE_PRODUCT_FAIL,
    ACTION_UPDATE_PRODUCT_LOADING,
    ACTION_UPDATE_PRODUCT_SUCCESS
} from "../actions/product";

export const STATUS_LOADING = "loading"
export const STATUS_UPDATED = "updated"
export const STATUS_LOADED = "loaded"
export const STATUS_CREATED = "created"
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
export const PRODUCT_FIELD_LIST_ID = 'list_id'
export const PRODUCT_FIELD_LIST = 'list'

const emptyModel = {
    id: "",
    title: "",
    description: "",
    link: "",
    image: "",
    barcode: "",
    category_ids: [],
    categories: [],
    list_id: "",
    list: "",
}

const initialState = {
    model: emptyModel,
    formStatus: STATUS_DEFAULT,
    formError: "",
    status: STATUS_DEFAULT,
    error: ""
}

export default function (state = initialState, action) {

    switch (action.type) {
        case ACTION_RESET_PRODUCT:
            return {
                ...state,
                error: null,
                status: STATUS_DEFAULT,
                formStatus: STATUS_DEFAULT,
                formError: "",
                model: emptyModel
            }
        case ACTION_FETCH_PRODUCT_FAIL:
            return {
                ...state,
                error: action.error,
                status: STATUS_ERROR,
                formError: "",
                formStatus: STATUS_DEFAULT,
            }
        case ACTION_FETCH_PRODUCT_NOT_FOUND:
            return {
                ...state,
                error: action.error,
                status: STATUS_NOT_FOUND,
                formError: "",
                formStatus: STATUS_DEFAULT,
            }
        case ACTION_FETCH_PRODUCT_LOADING:
            return {
                ...state,
                status: STATUS_LOADING,
                error: null,
                formError: "",
                formStatus: STATUS_DEFAULT,
            }

        case ACTION_FETCH_PRODUCT_SUCCESS:
            return {
                ...state,
                model: action.model,
                status: STATUS_LOADED,
                error: null,
                formError: "",
                formStatus: STATUS_DEFAULT,
            }
        case ACTION_UPDATE_PRODUCT_LOADING:
            return {
                ...state,
                formStatus: STATUS_LOADING,
                error: null,
                formError: "",
                status: STATUS_DEFAULT
            }
        case ACTION_UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                formStatus: STATUS_ERROR,
                error: "",
                formError: action.error,
                status: STATUS_DEFAULT
            }
        case ACTION_UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                formStatus: STATUS_UPDATED,
                error: null,
                status: STATUS_DEFAULT,
                formError: "",
                model: action.model
            }
        case ACTION_CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                formStatus: STATUS_CREATED,
                error: null,
                status: STATUS_CREATED,
                formError: "",
                model: action.model
            }
        case ACTION_CHANGE_PRODUCT_FIELD:

            let model = state.model
            model[action.field] = action.value

            if (action.field === PRODUCT_FIELD_LIST){
                model[PRODUCT_FIELD_LIST_ID] = action.value.id
            }

            if (action.field === PRODUCT_FIELD_CATEGORIES){
                model[PRODUCT_FIELD_CATEGORY_IDS] = action.value.map(item => item.id)
            }

            return {
                ...state,
                formStatus: STATUS_DEFAULT,
                error: null,
                status: STATUS_DEFAULT,
                formError: "",
                model: model
            }
        default:
            return state;
    }
}

