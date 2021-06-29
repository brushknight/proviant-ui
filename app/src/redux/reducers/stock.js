import {STATUS_DEFAULT, STATUS_ERROR, STATUS_LOADED, STATUS_LOADING} from "./consts";
import {ACTION_FETCH_STOCK_FAIL, ACTION_FETCH_STOCK_LOADING, ACTION_FETCH_STOCK_SUCCESS} from "../actions/const";

const initialState = {
    items: [],
    status: STATUS_DEFAULT,
    error: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION_FETCH_STOCK_SUCCESS:
            return {
                ...state,
                items: action.items || [],
                status: STATUS_LOADED,
                error: null
            }
        case ACTION_FETCH_STOCK_FAIL:
            return {
                ...state,
                items: [],
                status: STATUS_ERROR,
                error: action.error
            }
        case ACTION_FETCH_STOCK_LOADING:
            return {
                ...state,
                items: [],
                status: STATUS_LOADING,
                error: null
            }
        default:
            return state;
    }
}