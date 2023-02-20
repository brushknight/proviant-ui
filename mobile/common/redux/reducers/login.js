import {
	ACTION_USER_LOGIN_EMAIL_SENT,
	ACTION_USER_LOGIN_FAIL, ACTION_USER_LOGIN_RESET,
	ACTION_USER_LOGIN_SENDING, ACTION_USER_LOGIN_SUCCESS,
	ACTION_USER_UNAUTHORIZED
} from '../actions/const'
import {
	STATUS_AUTHORIZED,
	STATUS_DEFAULT,
	STATUS_ERROR,
	STATUS_SENDING,
	STATUS_SUCCESS,
	STATUS_UNAUTHORIZED
} from './consts'

const initialState = () => {
	return {
		status: STATUS_DEFAULT,
		error: ''
	}
}

export default function (state = initialState(), action) {
	switch (action.type) {
	case ACTION_USER_LOGIN_RESET:
		return {
			...state,
			status: STATUS_UNAUTHORIZED,
			error: ''
		}
	case ACTION_USER_UNAUTHORIZED:
		return {
			...state,
			status: STATUS_UNAUTHORIZED
		}
	case ACTION_USER_LOGIN_EMAIL_SENT:
		return {
			...state,
			status: STATUS_SUCCESS
		}
	case ACTION_USER_LOGIN_FAIL:
		return {
			...state,
			status: STATUS_ERROR,
			error: action.error
		}
	case ACTION_USER_LOGIN_SENDING:
		return {
			...state,
			status: STATUS_SENDING
		}
	default:
		return state
	}
}
