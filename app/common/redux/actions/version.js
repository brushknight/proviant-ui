import { ACTION_VERSION_CORE_LOADED } from './const'
import { generateCoreApiUrl } from '../../utils/link'
import { generateLocaleHeader } from '../../utils/i18n'
import axios from 'axios'

const fetchCoreVersionSuccess = (version) => {
	return {
		type: ACTION_VERSION_CORE_LOADED,
		version
	}
}

export const fetchCoreVersion = (locale) => {
	return (dispatch) => {
		axios.get(generateCoreApiUrl('/version/'), generateLocaleHeader(locale))
			.then(response => {
				const data = response.data
				dispatch(fetchCoreVersionSuccess(data.data))
			})
			.catch(error => {
				const errorMsq = error.message
				console.error(errorMsq)
			})
	}
}
