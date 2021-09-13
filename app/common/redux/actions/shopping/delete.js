import {
	ACTION_SHOPPING_LIST_ITEM_DELETE_FAIL,
	ACTION_SHOPPING_LIST_ITEM_DELETE_SENDING,
	ACTION_SHOPPING_LIST_ITEM_DELETE_SUCCESS
} from '../const'
import { generateCoreApiUrl } from '../../../utils/link'
import { generateLocaleHeader } from '../../../utils/i18n'
import { shoppingListDeleteItem } from './list'
import axios from 'axios'

const sending = (id) => {
	return {
		type: ACTION_SHOPPING_LIST_ITEM_DELETE_SENDING,
		id
	}
}

const success = (id) => {
	return {
		type: ACTION_SHOPPING_LIST_ITEM_DELETE_SUCCESS,
		id
	}
}

const fail = (error) => {
	return {
		type: ACTION_SHOPPING_LIST_ITEM_DELETE_FAIL,
		error
	}
}

export const shoppingItemDelete = (listId, id, locale) => {
	return (dispatch) => {
		dispatch(sending())
		axios.delete(generateCoreApiUrl(`/shopping_list/${listId}/${id}/`), generateLocaleHeader(locale))
			.then(() => {
				dispatch(success(id))
				dispatch(shoppingListDeleteItem(id))
			})
			.catch(error => {
				const errorMsq = error.message
				dispatch(fail(errorMsq))
			})
	}
}
