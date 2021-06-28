import {
    ACTION_CHANGE_CREATE_LIST_FORM,
    ACTION_CREATE_LIST_FAIL,
    ACTION_CREATE_LIST_SUCCESS,
    ACTION_FETCH_LIST_FAIL,
    ACTION_FETCH_LIST_LOADING,
    ACTION_FETCH_LIST_SUCCESS
} from "../actions/lists";

export const STATUS_LOADING = "loading"
export const STATUS_LOADED = "loaded"
export const STATUS_ERROR = "error"
export const STATUS_DEFAULT = "default"

let emptyCreateForm = {
    title: "",
    error: "",
    status: STATUS_DEFAULT
}

const initialState = {
    items: [],
    status: STATUS_DEFAULT,
    error: null,
    createForm: emptyCreateForm
};

export default function (state = initialState, action) {

    switch (action.type) {
        case ACTION_CHANGE_CREATE_LIST_FORM:
            return {
                ...state,
                createForm: {
                    title: action.title
                }
            }
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
        case ACTION_CREATE_LIST_SUCCESS:
            let items = state.items
            items.push(action.list)
            return {
                ...state,
                items: items,
                status: STATUS_LOADED,
                error: null,
                createForm: emptyCreateForm
            }
        case ACTION_CREATE_LIST_FAIL:

            let createForm = state.createForm
            createForm.status = STATUS_ERROR
            createForm.error = action.error

            return {
                ...state,
                error: "",
                status: STATUS_DEFAULT,
                createForm: createForm
            }
        default:
            return state;
    }
}

