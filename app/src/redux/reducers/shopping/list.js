import {STATUS_DEFAULT, STATUS_FETCH_FAILED, STATUS_LOADED, STATUS_LOADING} from '../consts'
import {
    ACTION_FETCH_SHOPPING_LIST_FAIL,
    ACTION_FETCH_SHOPPING_LIST_LOADING,
    ACTION_FETCH_SHOPPING_LIST_SUCCESS,
    ACTION_SHOPPING_LIST_ADD_ITEM,
    ACTION_SHOPPING_LIST_UPDATE_ITEM
} from "../../actions/const";

const defaultModel = () => {
    return {
        title: "",
        items: [],
        id: 0,
    }
}

function compareItems(a, b) {
    if (a.checked && !b.checked) {
        return 1;
    }
    if (!a.checked && b.checked) {
        return -1;
    }
    return 0;
}


const transform = (model) => {

    return {
        title: model.title,
        items: model.items.sort(compareItems),
        id: model.id,
    }
}

const addItem = (model, itemToAdd) => {

    let newItems = model.items
    newItems.unshift(itemToAdd)

    return {
        title: model.title,
        items: newItems,
        id: model.id,
    }
}

const updateItem = (model, itemToUpdate) => {

    let newItems = model.items.map((item) => {
        if (Number(item.id) === Number(itemToUpdate.id)) {
            return itemToUpdate
        }
        return item
    })

    return {
        title: model.title,
        items: newItems,
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

    switch (action.type) {
        case ACTION_SHOPPING_LIST_UPDATE_ITEM:

            return {
                ...state,
                status: STATUS_DEFAULT,
                error: null,
                model: transform(updateItem(state.model, action.item))
            }
        case ACTION_SHOPPING_LIST_ADD_ITEM:
            return {
                ...state,
                status: STATUS_DEFAULT,
                error: null,
                model: transform(addItem(state.model, action.item))
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
                model: transform(action.payload)
            }
        default:
            return state
    }
}
