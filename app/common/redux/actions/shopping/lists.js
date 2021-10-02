import {
	ACTION_FETCH_SHOPPING_LISTS_FAIL,
	ACTION_FETCH_SHOPPING_LISTS_LOADING,
	ACTION_FETCH_SHOPPING_LISTS_SUCCESS
} from '../const'
import { generateCoreApiUrl, generateHeaders } from '../../../utils/link'
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

export const shoppingListsFetch = (locale) => {
	return (dispatch) => {
		dispatch(fetchLoading())
		generateHeaders(locale).then(headers => {
			axios.get(generateCoreApiUrl('/shopping_list/'), headers)
				.then(response => {
					const data = response.data
					dispatch(fetchSuccess(data.data))
				})
				.catch(error => {
					const errorMsq = error.message
					dispatch(fetchFail(errorMsq))
				})
		})
	}
}
