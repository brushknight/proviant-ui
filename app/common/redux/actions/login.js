import {
	ACTION_USER_LOGIN_EMAIL_SENT,
	ACTION_USER_LOGIN_FAIL,
	ACTION_USER_LOGIN_RESET_ERROR,
	ACTION_USER_LOGIN_SENDING
} from './const'
import { generateAuthApiUrl, generateHeaders } from '../../utils/link'
import { handleError } from '../../utils/action'
import { validateEmail } from '../../validators/user'
import axios from 'axios'

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

export const actionLoginResetError = () => {
	return {
		type: ACTION_USER_LOGIN_RESET_ERROR
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
		generateHeaders(locale).then(headers => {
			axios.post(generateAuthApiUrl('/login/'), json, headers)
				.then(response => {
					dispatch(loginEmailSent())
				})
				.catch(error => {
					handleError(dispatch, error, loginFail, loginFail, loginFail)
				})
		})
	}
}
