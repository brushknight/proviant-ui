import axios from "axios";
import {generateCoreApiUrl} from "../../../utils/link";
import {generateLocaleHeader} from "../../../utils/i18n";
import {
    ACTION_SHOPPING_LIST_ITEM_EDIT_FAIL, ACTION_SHOPPING_LIST_ITEM_EDIT_RESET,
    ACTION_SHOPPING_LIST_ITEM_EDIT_SENDING, ACTION_SHOPPING_LIST_ITEM_EDIT_SUCCESS,
    ACTION_SHOPPING_LIST_UPDATE_ITEM_SENDING,
    ACTION_SHOPPING_LIST_UPDATE_ITEM_SUCCESS
} from "../const";
import {shoppingListUpdateItem} from "./list";

const sending = (id) => {
    return {
        type: ACTION_SHOPPING_LIST_ITEM_EDIT_SENDING,
        id
    }
}

const success = () => {
    return {
        type: ACTION_SHOPPING_LIST_ITEM_EDIT_SUCCESS
    }
}

const fail = (error) => {
    return {
        type: ACTION_SHOPPING_LIST_ITEM_EDIT_FAIL,
        error
    }
}

export const shoppingListItemReset = () => {
    return {
        type: ACTION_SHOPPING_LIST_ITEM_EDIT_RESET
    }
}

export const shoppingListItemUpdate = (listId, id, dto, locale) => {
    const json = JSON.stringify(dto)
    return (dispatch) => {
        dispatch(sending())
        axios.put(generateCoreApiUrl(`/shopping_list/${listId}/${id}/`), json, generateLocaleHeader(locale))
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
