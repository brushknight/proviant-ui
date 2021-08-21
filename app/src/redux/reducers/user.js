import { ACTION_USER_FETCH_FAILED, ACTION_USER_LOADED, ACTION_USER_UNAUTHORIZED } from '../actions/const'
import {STATUS_DEFAULT, STATUS_ERROR, STATUS_LOADED, STATUS_UNAUTHORIZED} from './consts'

const emptyUser = () => {
	return {
		email: '',
		accountId: '',
		userId: ''
	}
}

const initialState = () => {
	return {
		status: STATUS_DEFAULT,
		error: '',
		model: emptyUser()
	}
}

export default function (state = initialState(), action) {
	switch (action.type) {
	case ACTION_USER_UNAUTHORIZED:
		return {
			...state,
			status: STATUS_UNAUTHORIZED
		}
	case ACTION_USER_LOADED:
		return {
			...state,
			status: STATUS_LOADED,
			model: action.user
		}
	case ACTION_USER_FETCH_FAILED:
		return {
			...state,
			status: STATUS_ERROR,
			error: action.error
		}

	default:
		return state
	}
}
