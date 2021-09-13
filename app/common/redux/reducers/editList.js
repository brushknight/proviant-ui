import {
	ACTION_DELETE_LIST_FAIL,
	ACTION_DELETE_LIST_SUCCESS,
	ACTION_EDIT_LIST_FAIL,
	ACTION_EDIT_LIST_FETCH_FAIL,
	ACTION_EDIT_LIST_FETCHED,
	ACTION_EDIT_LIST_FETCHING,
	ACTION_EDIT_LIST_RESET,
	ACTION_EDIT_LIST_SENDING,
	ACTION_EDIT_LIST_SUCCESS
} from '../actions/const'
import {
	STATUS_DEFAULT,
	STATUS_DELETED,
	STATUS_ERROR,
	STATUS_FETCH_FAILED,
	STATUS_FETCHED,
	STATUS_FETCHING,
	STATUS_SENDING,
	STATUS_UPDATED
} from './consts'

const emptyModel = () => {
	return {
		title: '',
		id: 0
	}
}

const initialState = () => {
	return {
		model: emptyModel(),
		status: STATUS_DEFAULT,
		error: null
	}
}

export default function (state = initialState(), action) {
	switch (action.type) {
	case ACTION_DELETE_LIST_SUCCESS:
		return {
			...initialState(),
			status: STATUS_DELETED
		}
	case ACTION_DELETE_LIST_FAIL:
		return {
			...initialState(),
			status: STATUS_ERROR,
			error: action.error
		}
	case ACTION_EDIT_LIST_RESET:
		return {
			...initialState()
		}
	case ACTION_EDIT_LIST_FETCHING:
		return {
			...initialState(),
			model: emptyModel(),
			status: STATUS_FETCHING
		}
	case ACTION_EDIT_LIST_FETCHED:
		return {
			...initialState(),
			model: action.model,
			status: STATUS_FETCHED
		}
	case ACTION_EDIT_LIST_FETCH_FAIL:
		return {
			...initialState(),
			status: STATUS_FETCH_FAILED,
			error: action.error
		}
	case ACTION_EDIT_LIST_SENDING:
		return {
			...state,
			status: STATUS_SENDING
		}
	case ACTION_EDIT_LIST_FAIL:
		return {
			...initialState(),
			status: STATUS_ERROR,
			error: action.error
		}
	case ACTION_EDIT_LIST_SUCCESS:
		return {
			...initialState(),
			status: STATUS_UPDATED,
			model: action.model,
			error: null
		}
	default:
		return state
	}
}
