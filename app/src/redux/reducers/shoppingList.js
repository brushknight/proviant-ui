import {STATUS_DEFAULT, STATUS_FETCH_FAILED, STATUS_LOADED, STATUS_LOADING} from './consts'
import {
    ACTION_FETCH_SHOPPING_LIST_FAIL,
    ACTION_FETCH_SHOPPING_LIST_LOADING,
    ACTION_FETCH_SHOPPING_LIST_SUCCESS, ACTION_SHOPPING_LIST_ADD_ITEM
} from "../actions/const";

const defaultModel = () => {
    return {
        title: "",
        items: [],
        id: 0,
    }
}

const addItem = (model, items) => {
    return {
        title: model.title,
        items: items,
        id: model.id,
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

    let newItems

    switch (action.type) {
        case ACTION_SHOPPING_LIST_ADD_ITEM:
            newItems = state.model.items
            newItems.unshift(action.item)
            return {
                ...state,
                status: STATUS_DEFAULT,
                error: null,
                model: addItem(state.model, newItems)
            }
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
