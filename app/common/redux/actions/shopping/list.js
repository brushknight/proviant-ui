import {
	ACTION_FETCH_SHOPPING_LIST_FAIL,
	ACTION_FETCH_SHOPPING_LIST_LOADING,
	ACTION_FETCH_SHOPPING_LIST_SUCCESS,
	ACTION_SHOPPING_LIST_ADD_ITEM,
	ACTION_SHOPPING_LIST_DELETE_ITEM,
	ACTION_SHOPPING_LIST_UPDATE_ITEM, ACTION_SHOPPING_LIST_RESET
} from '../const'
import { generateCoreApiUrl, generateHeaders } from '../../../utils/link'
import { handleError } from '../../../utils/action'
import axios from 'axios'

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

export const shoppingListDeleteItem = (id) => {
	return {
		type: ACTION_SHOPPING_LIST_DELETE_ITEM,
		id
	}
}

export const shoppingListReset = () => {
	return {
		type: ACTION_SHOPPING_LIST_RESET
	}
}

export const shoppingListFetchItems = (id, locale) => {
	return (dispatch) => {
		dispatch(fetchLoading())
		generateHeaders(locale).then(headers => {
			axios.get(generateCoreApiUrl(`/shopping_list/${id}/`), headers)
				.then(response => {
					const data = response.data
					dispatch(fetchSuccess(data.data))
				})
				.catch(error => {
					handleError(dispatch, error, fetchFail, fetchFail, fetchFail)
				})
		})
	}
}
