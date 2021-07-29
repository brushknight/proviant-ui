import { ACTION_USER_FETCH_FAILED, ACTION_USER_LOADED, ACTION_USER_UNAUTHORIZED } from './const'
import { generateAuthApiUrl } from '../../utils/link'
import { generateLocaleHeader } from '../../utils/i18n'
import { isSaaS } from '../../utils/run_mode'
import { setCookie } from '../../utils/cookies'
import axios from 'axios'

const fetchUserSuccess = (user) => {
	return {
		type: ACTION_USER_LOADED,
		user
	}
}

const fetchUserFailed = (error) => {
	return {
		type: ACTION_USER_FETCH_FAILED,
		error
	}
}

export const userUnauthorized = () => {
	return {
		type: ACTION_USER_UNAUTHORIZED
	}
}

export const updateLocale = (locale) => {
	if (isSaaS()) {
		return (dispatch) => {
			axios.get(generateAuthApiUrl('/locale/'), generateLocaleHeader(locale))
		}
	}

	return (dispatch) => {
		setCookie('user-locale', locale, 365 * 5)
	}
}

export const fetchUser = (locale) => {
	return (dispatch) => {
		axios.get(generateAuthApiUrl('/user/'), generateLocaleHeader(locale))
			.then(response => {
				const data = response.data
				dispatch(fetchUserSuccess(data.data))
			})
			.catch(error => {
				const errorMsq = error.message
				if (error.response) {
					switch (error.response.status) {
					case 400:
						dispatch(fetchUserFailed(error.response.data.error))
						break
					case 401:
						dispatch(userUnauthorized())
						break
					default:
						dispatch(fetchUserFailed(error.response.data.error))
					}
				} else {
					fetchUserFailed(errorMsq)
				}
			})
	}
}
