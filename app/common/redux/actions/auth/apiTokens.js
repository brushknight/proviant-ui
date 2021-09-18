import { ACTION_FETCH_API_TOKENS_FAIL, ACTION_FETCH_API_TOKENS_LOADING, ACTION_FETCH_API_TOKENS_SUCCESS } from '../const'
import { generateAuthApiUrl } from '../../../utils/link'
import { generateLocaleHeader } from '../../../utils/i18n'
import axios from 'axios'

const fetchLoading = () => {
	return {
		type: ACTION_FETCH_API_TOKENS_LOADING
	}
}

const fetchFail = error => {
	return {
		type: ACTION_FETCH_API_TOKENS_FAIL,
		error: error
	}
}

const fetchSuccess = payload => {
	return {
		type: ACTION_FETCH_API_TOKENS_SUCCESS,
		payload: payload
	}
}

export const apiTokensFetch = (locale) => {
	return (dispatch) => {
		dispatch(fetchLoading())
		axios.get(generateAuthApiUrl('/api-token/'), generateLocaleHeader(locale))
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
