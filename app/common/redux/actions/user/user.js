import { ACTION_USER_FETCH_FAILED, ACTION_USER_LOADED, ACTION_USER_LOGOUT, ACTION_USER_UNAUTHORIZED } from '../const'
import { clearJWT } from '../../../utils/security'
import { generateAuthApiUrl, generateHeaders } from '../../../utils/link'
import { handleError } from '../../../utils/action'
import { isSaaS } from '../../../utils/env'
import { setCookie } from '../../../utils/cookies'
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

const logout = () => {
	return {
		type: ACTION_USER_LOGOUT
	}
}

export const logoutUser = () => {
	return (dispatch) => {
		clearJWT().then(() => {
			dispatch(logout())
		})
	}
}

export const updateLocale = (locale) => {
	if (isSaaS()) {
		return (dispatch) => {
			generateHeaders(locale).then(headers => {
				axios.get(generateAuthApiUrl('/locale/'), headers)
			})
		}
	}

	return (dispatch) => {
		setCookie('user-locale', locale, 365 * 5)
	}
}

export const fetchUser = (locale) => {
	return (dispatch) => {
		generateHeaders(locale).then(headers => {
			axios.get(generateAuthApiUrl('/user/'), headers)
				.then(response => {
					const data = response.data
					dispatch(fetchUserSuccess(data.data))
				})
				.catch(error => {
					handleError(dispatch, error, fetchUserFailed, fetchUserFailed, fetchUserFailed)
				})
		})
	}
}
