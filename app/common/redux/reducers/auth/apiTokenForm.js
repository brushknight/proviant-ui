import { ACTION_CREATE_API_TOKEN_FAIL, ACTION_CREATE_API_TOKEN_SENDING, ACTION_CREATE_API_TOKEN_SUCCESS } from '../../actions/const'
import { STATUS_DEFAULT, STATUS_ERROR, STATUS_SENDING } from '../consts'

const initialState = () => {
	return {
		status: STATUS_DEFAULT,
		error: null
	}
}

export default function (state = initialState(), action) {
	switch (action.type) {
	case ACTION_CREATE_API_TOKEN_SENDING:
		return {
			...state,
			status: STATUS_SENDING,
			error: null
		}
	case ACTION_CREATE_API_TOKEN_FAIL:
		return {
			...state,
			status: STATUS_ERROR,
			error: action.error
		}
	case ACTION_CREATE_API_TOKEN_SUCCESS:
		return {
			...state,
			status: STATUS_DEFAULT,
			error: null
		}
	default:
		return state
	}
}
