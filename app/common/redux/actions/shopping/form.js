import {
	ACTION_CREATE_SHOPPING_LIST_ITEM_FAIL,
	ACTION_CREATE_SHOPPING_LIST_ITEM_RESET,
	ACTION_CREATE_SHOPPING_LIST_ITEM_SENDING,
	ACTION_CREATE_SHOPPING_LIST_ITEM_SUCCESS
} from '../const'
import { generateCoreApiUrl, generateHeaders } from '../../../utils/link'
import { handleError } from '../../../utils/action'
import { shoppingListAddItem } from './list'
import axios from 'axios'

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

export const shoppingFormReset = () => {
	return {
		type: ACTION_CREATE_SHOPPING_LIST_ITEM_RESET
	}
}

export const shoppingFormSubmit = (listId, dto, locale) => {
	const json = JSON.stringify(dto)
	return (dispatch) => {
		dispatch(sending())
		generateHeaders(locale).then(headers => {
			axios.post(generateCoreApiUrl(`/shopping_list/${listId}/`), json, headers)
				.then(response => {
					const data = response.data
					dispatch(success(data.data))
					dispatch(shoppingListAddItem(data.data))
				})
				.catch(error => {
					handleError(dispatch, error, fail, fail, fail)
				})
		})
	}
}
