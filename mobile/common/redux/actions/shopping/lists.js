import {
	ACTION_FETCH_SHOPPING_LISTS_FAIL,
	ACTION_FETCH_SHOPPING_LISTS_LOADING,
	ACTION_FETCH_SHOPPING_LISTS_SUCCESS,
	ACTION_FETCH_SHOPPING_RESET
} from '../const'
import { generateCoreApiUrl, generateHeaders } from '../../../utils/link'
import { handleError } from '../../../utils/action'
import axios from 'axios'

const fetchLoading = () => {
	return {
		type: ACTION_FETCH_SHOPPING_LISTS_LOADING
	}
}

const fetchFail = error => {
	return {
		type: ACTION_FETCH_SHOPPING_LISTS_FAIL,
		error: error
	}
}

const fetchSuccess = payload => {
	return {
		type: ACTION_FETCH_SHOPPING_LISTS_SUCCESS,
		payload: payload
	}
}
export const shoppingListsReset = () => {
	return {
		type: ACTION_FETCH_SHOPPING_RESET
	}
}

export const shoppingListFetchLists = (locale) => {
	return (dispatch) => {
		dispatch(fetchLoading())
		generateHeaders(locale).then(headers => {
			axios.get(generateCoreApiUrl('/shopping_list/'), headers)
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
