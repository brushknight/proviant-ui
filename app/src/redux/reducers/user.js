import { ACTION_USER_UNAUTHORIZED } from '../actions/const'
import { STATUS_DEFAULT, STATUS_UNAUTHORIZED } from './consts'

const initialState = () => {
	return {
		status: STATUS_DEFAULT,
		error: ''
	}
}

export default function (state = initialState(), action) {
	switch (action.type) {
	case ACTION_USER_UNAUTHORIZED:
		return {
			...state,
			status: STATUS_UNAUTHORIZED
		}
	default:
		return state
	}
}
