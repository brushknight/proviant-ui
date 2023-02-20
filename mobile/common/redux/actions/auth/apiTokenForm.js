import {
	ACTION_CREATE_API_TOKEN_FAIL,
	ACTION_CREATE_API_TOKEN_SENDING,
	ACTION_CREATE_API_TOKEN_SUCCESS,
	ACTION_CREATE_SHOPPING_LIST_ITEM_RESET
} from '../const'
import { generateAuthApiUrl, generateHeaders } from '../../../utils/link'
import { handleError } from '../../../utils/action'
import axios from 'axios'

const sending = () => {
	return {
		type: ACTION_CREATE_API_TOKEN_SENDING
	}
}

const fail = error => {
	return {
		type: ACTION_CREATE_API_TOKEN_FAIL,
		error: error
	}
}

const success = payload => {
	return {
		type: ACTION_CREATE_API_TOKEN_SUCCESS,
		payload: payload
	}
}

export const shoppingFormReset = () => {
	return {
		type: ACTION_CREATE_SHOPPING_LIST_ITEM_RESET
	}
}

export const apiTokenSubmitForm = (locale) => {
	const json = JSON.stringify({})
	return (dispatch) => {
		dispatch(sending())

		generateHeaders(locale).then(headers => {
			axios.post(generateAuthApiUrl('/api-token/'), json, headers)
				.then(response => {
					const data = response.data
					dispatch(success(data.data))
				})
				.catch(error => {
					handleError(dispatch, error, fail)
				})
		})
	}
}
