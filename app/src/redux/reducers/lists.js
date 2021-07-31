import {
	ACTION_CREATE_LIST_FAIL,
	ACTION_CREATE_LIST_LOADING,
	ACTION_CREATE_LIST_RESET,
	ACTION_CREATE_LIST_SUCCESS,
	ACTION_DELETE_LIST_IN_LIST,
	ACTION_FETCH_LIST_FAIL,
	ACTION_FETCH_LIST_LOADING,
	ACTION_FETCH_LIST_SUCCESS,
	ACTION_UPDATE_LIST_IN_LIST
} from '../actions/const'
import { STATUS_CREATED, STATUS_DEFAULT, STATUS_ERROR, STATUS_LOADED, STATUS_LOADING } from './consts'

const emptyCreateForm = () => {
	return {
		model: {
			id: 0,
			title: ''
		},
		error: '',
		status: STATUS_DEFAULT
	}
}

const initialState = () => {
	return {
		items: [],
		status: STATUS_DEFAULT,
		error: null,
		createForm: emptyCreateForm()
	}
}

export default function (state = initialState(), action) {
	let items = []
	switch (action.type) {
	case ACTION_CREATE_LIST_RESET:
		return {
			...state,
			error: null,
			createForm: emptyCreateForm()
		}
	case ACTION_DELETE_LIST_IN_LIST:
		items = state.items
		items = items.filter(item => item.id !== action.id)

		return {
			...state,
			items
		}
	case ACTION_UPDATE_LIST_IN_LIST:
		items = state.items

		items = items.map(item => {
			if (item.id === action.model.id) {
				return action.model
			}
			return item
		})

		return {
			...state,
			items
		}
	case ACTION_FETCH_LIST_FAIL:
		return {
			...state,
			error: action.error,
			status: STATUS_ERROR
		}
	case ACTION_FETCH_LIST_LOADING:
		return {
			...state,
			status: STATUS_LOADING,
			error: null
		}

	case ACTION_FETCH_LIST_SUCCESS:
		return {
			...state,
			items: action.payload,
			status: STATUS_LOADED,
			error: null
		}
	case ACTION_CREATE_LIST_SUCCESS:
		items = state.items
		items.push(action.list)

		const createSuccessForm = emptyCreateForm()
		createSuccessForm.model = action.list
		createSuccessForm.status = STATUS_CREATED

		return {
			...state,
			items: items,
			createForm: createSuccessForm
		}
	case ACTION_CREATE_LIST_LOADING:
		const createFormLoading = state.createForm
		createFormLoading.status = STATUS_LOADING

		return {
			...state,
			status: STATUS_DEFAULT,
			error: null,
			createForm: createFormLoading
		}
	case ACTION_CREATE_LIST_FAIL:

		const createForm = state.createForm
		createForm.status = STATUS_ERROR
		createForm.error = action.error

		return {
			...state,
			error: '',
			status: STATUS_DEFAULT,
			createForm: createForm
		}
	default:
		return state
	}
}
