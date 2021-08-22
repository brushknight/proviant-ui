import {
    STATUS_CREATED,
    STATUS_DEFAULT,
    STATUS_ERROR,
    STATUS_FETCH_FAILED,
    STATUS_LOADED,
    STATUS_LOADING,
    STATUS_SENDING
} from '../consts'
import {
    ACTION_CREATE_SHOPPING_LIST_ITEM_FAIL,
    ACTION_CREATE_SHOPPING_LIST_ITEM_SENDING,
    ACTION_CREATE_SHOPPING_LIST_ITEM_SUCCESS,
    ACTION_FETCH_SHOPPING_LIST_FAIL,
    ACTION_FETCH_SHOPPING_LIST_LOADING,
    ACTION_FETCH_SHOPPING_LIST_SUCCESS
} from "../../actions/const";


const initialState = () => {
    return {
        status: STATUS_DEFAULT,
        error: null
    }
}

export default function (state = initialState(), action) {

    switch (action.type) {
        case ACTION_CREATE_SHOPPING_LIST_ITEM_SENDING:
            return {
                ...state,
                status: STATUS_SENDING,
                error: null
            }
        case ACTION_CREATE_SHOPPING_LIST_ITEM_FAIL:
            return {
                ...state,
                status: STATUS_ERROR,
                error: action.error
            }
        case ACTION_CREATE_SHOPPING_LIST_ITEM_SUCCESS:
            return {
                ...state,
                status: STATUS_CREATED,
                error: null
            }
        default:
            return state
    }
}
