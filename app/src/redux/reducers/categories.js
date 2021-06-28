import {
    ACTION_CHANGE_CREATE_CATEGORY_FORM,
    ACTION_CREATE_CATEGORY_SUCCESS,
    ACTION_FETCH_CATEGORIES_FAIL,
    ACTION_FETCH_CATEGORIES_LOADING,
    ACTION_FETCH_CATEGORIES_SUCCESS
} from "../actions/categories";

export const STATUS_LOADING = "loading"
export const STATUS_LOADED = "loaded"
export const STATUS_ERROR = "error"
export const STATUS_DEFAULT = "default"

const initialState = {
    items: [],
    status: STATUS_DEFAULT,
    error: null,
    createForm:{
        title: ""
    }
};

export default function(state = initialState, action) {

    switch (action.type) {
        case ACTION_CHANGE_CREATE_CATEGORY_FORM:
            return {
                ...state,
                createForm: {
                    title: action.title
                }
            }
        case ACTION_FETCH_CATEGORIES_FAIL:
            return {
                ...state,
                error: action.error,
                status: STATUS_ERROR
            }
        case ACTION_FETCH_CATEGORIES_LOADING:
            return {
                ...state,
                status: STATUS_LOADING,
                error: null
            }

        case ACTION_FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                items: action.payload,
                status: STATUS_LOADED,
                error: null
            }
        case ACTION_CREATE_CATEGORY_SUCCESS:
            let items = state.items
            items.push(action.category)
            return {
                ...state,
                items: items,
                status: STATUS_LOADED,
                error: null,
                createForm: {
                    title: ""
                }
            }
        default:
            return state;
    }
}
