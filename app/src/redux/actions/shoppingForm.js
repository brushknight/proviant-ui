import {
    ACTION_CREATE_SHOPPING_LIST_ITEM_FAIL,
    ACTION_CREATE_SHOPPING_LIST_ITEM_SENDING, ACTION_CREATE_SHOPPING_LIST_ITEM_SUCCESS,
    ACTION_FETCH_SHOPPING_LIST_FAIL,
    ACTION_FETCH_SHOPPING_LIST_LOADING,
    ACTION_FETCH_SHOPPING_LIST_SUCCESS
} from "./const";
import axios from "axios";
import {generateCoreApiUrl} from "../../utils/link";
import {generateLocaleHeader} from "../../utils/i18n";
import {shoppingListAddItem} from "./shoppingList";


const sending = () => {
    return {
        type: ACTION_CREATE_SHOPPING_LIST_ITEM_SENDING
    }
}

const fail = error => {
    return {
        type: ACTION_CREATE_SHOPPING_LIST_ITEM_FAIL,
        error: error
    }
}

const success = payload => {
    return {
        type: ACTION_CREATE_SHOPPING_LIST_ITEM_SUCCESS,
        payload: payload
    }
}

export const shoppingFormSubmit = (listId, dto, locale) => {
    const json = JSON.stringify(dto)
    console.log(json)
    return (dispatch) => {
        dispatch(sending())
        axios.post(generateCoreApiUrl(`/shopping_list/${listId}/`), json, generateLocaleHeader(locale))
            .then(response => {
                const data = response.data
                dispatch(success(data.data))
                dispatch(shoppingListAddItem(data.data))
            })
            .catch(error => {
                if (error.response && error.response.status) {
                    dispatch(fail(error.response.data.error))
                } else {
                    dispatch(fail(error.message))
                }
            })
    }
}