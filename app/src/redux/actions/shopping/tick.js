import axios from "axios";
import {generateCoreApiUrl} from "../../../utils/link";
import {generateLocaleHeader} from "../../../utils/i18n";
import {ACTION_SHOPPING_LIST_UPDATE_ITEM_SENDING, ACTION_SHOPPING_LIST_UPDATE_ITEM_SUCCESS} from "../const";
import {shoppingListUpdateItem} from "./list";

const sending = (id) => {
    return {
        type: ACTION_SHOPPING_LIST_UPDATE_ITEM_SENDING,
        id
    }
}

const success = (item) => {
    return {
        type: ACTION_SHOPPING_LIST_UPDATE_ITEM_SUCCESS,
        item
    }
}

const fail = () => {
    return {}
}

export const shoppingListItemCheck = (listId, id, locale) => {
    return (dispatch) => {
        dispatch(sending())
        axios.put(generateCoreApiUrl(`/shopping_list/${listId}/${id}/check/`), generateLocaleHeader(locale))
            .then(response => {
                const data = response.data
                dispatch(success(data.data))
                dispatch(shoppingListUpdateItem(data.data))
            })
            .catch(error => {
                const errorMsq = error.message
                dispatch(fail(errorMsq))
            })
    }
}


export const shoppingListItemUncheck = (listId, id, locale) => {
    return (dispatch) => {
        dispatch(sending())
        axios.put(generateCoreApiUrl(`/shopping_list/${listId}/${id}/uncheck/`), generateLocaleHeader(locale))
            .then(response => {
                const data = response.data
                dispatch(success(data.data))
                dispatch(shoppingListUpdateItem(data.data))
            })
            .catch(error => {
                const errorMsq = error.message
                dispatch(fail(errorMsq))
            })
    }
}