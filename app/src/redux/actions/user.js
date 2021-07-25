import {
	ACTION_USER_LOGIN_EMAIL_SENT,
	ACTION_USER_LOGIN_FAIL,
	ACTION_USER_LOGIN_SENDING,
	ACTION_USER_UNAUTHORIZED
} from './const'
import { generateCoreAuthUrl } from '../../utils/link'
import { generateLocaleHeader } from '../../utils/i18n'
import { validateEmail } from '../../validators/user'
import axios from 'axios'

export const userUnauthorized = () => {
	return {
		type: ACTION_USER_UNAUTHORIZED
	}
}

const loginFail = (error) => {
	return {
		type: ACTION_USER_LOGIN_FAIL,
		error
	}
}

const loginSending = () => {
	return {
		type: ACTION_USER_LOGIN_SENDING
	}
}

const loginEmailSent = () => {
	return {
		type: ACTION_USER_LOGIN_EMAIL_SENT
	}
}

export const actionLogin = (email, locale) => {
	return (dispatch) => {
		const error = validateEmail(email)

		if (error) {
			dispatch(loginFail(error))
			return
		}

		dispatch(loginSending())
		const json = JSON.stringify({
			email
		})
		axios.post(generateCoreAuthUrl('/login/'), json, generateLocaleHeader(locale))
			.then(response => {
				dispatch(loginEmailSent())
			})
			.catch(error => {
				if (error.response && error.response.status && error.response.data.error) {
					dispatch(loginFail(error.response.data.error))
				} else {
					const errorMsq = error.message
					dispatch(loginFail(errorMsq))
				}
			})
	}
}
