import { ACTION_SHOPPING_LIST_UPDATE_ITEM_SENDING, ACTION_SHOPPING_LIST_UPDATE_ITEM_SUCCESS } from '../const'
import { generateCoreApiUrl, generateHeaders } from '../../../utils/link'
import { handleError } from '../../../utils/action'
import { shoppingListUpdateItem } from './list'
import axios from 'axios'

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
		generateHeaders(locale).then(headers => {
			axios.put(generateCoreApiUrl(`/shopping_list/${listId}/${id}/check/`), {}, headers)
				.then(response => {
					const data = response.data
					dispatch(success(data.data))
					dispatch(shoppingListUpdateItem(data.data))
				})
				.catch(error => {
					handleError(dispatch, error, fail, fail, fail)
				})
		})
	}
}

export const shoppingListItemUncheck = (listId, id, locale) => {
	return (dispatch) => {
		dispatch(sending())
		generateHeaders(locale).then(headers => {
			axios.put(generateCoreApiUrl(`/shopping_list/${listId}/${id}/uncheck/`), {}, headers)
				.then(response => {
					const data = response.data
					dispatch(success(data.data))
					dispatch(shoppingListUpdateItem(data.data))
				})
				.catch(error => {
					handleError(dispatch, error, fail, fail, fail)
				})
		})
	}
}
