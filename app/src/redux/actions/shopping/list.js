import {
    ACTION_FETCH_SHOPPING_LIST_FAIL,
    ACTION_FETCH_SHOPPING_LIST_LOADING,
    ACTION_FETCH_SHOPPING_LIST_SUCCESS,
    ACTION_SHOPPING_LIST_ADD_ITEM, ACTION_SHOPPING_LIST_UPDATE_ITEM
} from "../const";
import axios from "axios";
import {generateCoreApiUrl} from "../../../utils/link";
import {generateLocaleHeader} from "../../../utils/i18n";

const fetchLoading = () => {
    return {
        type: ACTION_FETCH_SHOPPING_LIST_LOADING
    }
}

const fetchFail = error => {
    return {
        type: ACTION_FETCH_SHOPPING_LIST_FAIL,
        error: error
    }
}

const fetchSuccess = payload => {
    return {
        type: ACTION_FETCH_SHOPPING_LIST_SUCCESS,
        payload: payload
    }
}

export const shoppingListAddItem = (item) => {
    return {
        type: ACTION_SHOPPING_LIST_ADD_ITEM,
        item
    }
}

export const shoppingListUpdateItem = (item) => {
    return {
        type: ACTION_SHOPPING_LIST_UPDATE_ITEM,
        item
    }
}

export const shoppingListFetchItems = (id, locale) => {
    return (dispatch) => {
        dispatch(fetchLoading())
        axios.get(generateCoreApiUrl(`/shopping_list/${id}/`), generateLocaleHeader(locale))
            .then(response => {
                const data = response.data
                dispatch(fetchSuccess(data.data))
            })
            .catch(error => {
                const errorMsq = error.message
                dispatch(fetchFail(errorMsq))
            })
    }
}