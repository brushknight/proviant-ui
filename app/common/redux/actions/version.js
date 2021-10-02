import { ACTION_VERSION_CORE_LOADED } from './const'
import { generateCoreApiUrl, generateHeaders } from '../../utils/link'
import axios from 'axios'

const fetchCoreVersionSuccess = (version) => {
	return {
		type: ACTION_VERSION_CORE_LOADED,
		version
	}
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
					const errorMsq = error.message
					console.error(errorMsq)
				})
		})
	}
}
