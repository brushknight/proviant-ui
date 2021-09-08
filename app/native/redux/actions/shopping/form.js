import {
	ACTION_CREATE_SHOPPING_LIST_ITEM_FAIL, ACTION_CREATE_SHOPPING_LIST_ITEM_RESET,
	ACTION_CREATE_SHOPPING_LIST_ITEM_SENDING,
	ACTION_CREATE_SHOPPING_LIST_ITEM_SUCCESS
} from '../const'
import { generateCoreApiUrl } from '../../../utils/link'
import { generateLocaleHeader } from '../../../utils/i18n'
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
