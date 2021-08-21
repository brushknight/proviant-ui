import {STATUS_DEFAULT, STATUS_FETCH_FAILED, STATUS_LOADED, STATUS_LOADING} from './consts'
import {
    ACTION_FETCH_SHOPPING_LIST_FAIL,
    ACTION_FETCH_SHOPPING_LIST_LOADING,
    ACTION_FETCH_SHOPPING_LIST_SUCCESS
} from "../actions/const";

const defaultModel = () => {
    return {
        title: "",
        items: [],
        id: 0,
    }
}

const initialState = () => {
    return {
        model: defaultModel(),
        status: STATUS_DEFAULT,
        error: null
    }
}

export default function (state = initialState(), action) {

    switch (action.type) {
        case ACTION_FETCH_SHOPPING_LIST_LOADING:
            return {
                ...state,
                status: STATUS_LOADING,
                error: null
            }
        case ACTION_FETCH_SHOPPING_LIST_FAIL:
            return {
                ...state,
                status: STATUS_FETCH_FAILED,
                error: action.error
            }
        case ACTION_FETCH_SHOPPING_LIST_SUCCESS:
            return {
                ...state,
                status: STATUS_LOADED,
                error: null,
                model: action.payload
            }
        default:
            return state
    }
}
