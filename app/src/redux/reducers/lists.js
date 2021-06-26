import {ACTION_FETCH_LIST_FAIL, ACTION_FETCH_LIST_LOADING, ACTION_FETCH_LIST_SUCCESS} from "../actions/lists";

export const STATUS_LOADING = "loading"
export const STATUS_LOADED = "loaded"
export const STATUS_ERROR = "error"
export const STATUS_DEFAULT = "default"

const initialState = {
    items: [],
    status: STATUS_DEFAULT,
    error: null
};

export default function(state = initialState, action) {

    switch (action.type) {
        case ACTION_FETCH_LIST_FAIL:
            return {
                ...state,
                error: action.error,
                status: STATUS_ERROR
            }
        case ACTION_FETCH_LIST_LOADING:
            return {
                ...state,
                status: STATUS_LOADING,
                error: null
            }

        case ACTION_FETCH_LIST_SUCCESS:
            return {
                ...state,
                items: action.payload,
                status: STATUS_LOADED,
                error: null
            }
        default:
            return state;
    }
}

