import {
	ACTION_USER_REGISTER_EMAIL_SENT,
	ACTION_USER_REGISTER_FAIL,
	ACTION_USER_REGISTER_RESET_ERROR,
	ACTION_USER_REGISTER_SENDING
} from '../actions/const'
import { STATUS_DEFAULT, STATUS_ERROR, STATUS_SENDING, STATUS_SUCCESS, STATUS_UNAUTHORIZED } from './consts'

const initialState = () => {
	return {
		status: STATUS_DEFAULT,
		error: ''
	}
}

export default function (state = initialState(), action) {
	switch (action.type) {
	case ACTION_USER_REGISTER_RESET_ERROR:
		return {
			...state,
			status: STATUS_UNAUTHORIZED,
			error: ''
		}
	case ACTION_USER_REGISTER_EMAIL_SENT:
		return {
			...state,
			status: STATUS_SUCCESS
		}
	case ACTION_USER_REGISTER_FAIL:
		return {
			...state,
			status: STATUS_ERROR,
			error: action.error
		}
	case ACTION_USER_REGISTER_SENDING:
		return {
			...state,
			status: STATUS_SENDING
		}
	default:
		return state
	}
}
