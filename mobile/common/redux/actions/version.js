import { ACTION_VERSION_CORE_LOADED } from './const'
import { generateCoreApiUrl, generateHeaders } from '../../utils/link'
import { handleError } from '../../utils/action'
import axios from 'axios'

const fetchCoreVersionSuccess = (version) => {
	return {
		type: ACTION_VERSION_CORE_LOADED,
		version
	}
}

const fetchFail = (error) => {
	console.error(error)
}

export const fetchCoreVersion = (locale) => {
	return (dispatch) => {
		generateHeaders(locale).then(headers => {
			axios.get(generateCoreApiUrl('/version/'), headers)
				.then(response => {
					const data = response.data
					dispatch(fetchCoreVersionSuccess(data.data))
				})
				.catch(error => {
					handleError(dispatch, error, fetchFail, fetchFail, fetchFail)
				})
		})
	}
}
