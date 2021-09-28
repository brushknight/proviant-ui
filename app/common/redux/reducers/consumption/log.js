import {
	ACTION_ADD_CONSUMPTION_LOG_ITEM,
	ACTION_FETCH_CONSUMPTION_LOG_FAIL,
	ACTION_FETCH_CONSUMPTION_LOG_LOADING,
	ACTION_FETCH_CONSUMPTION_LOG_SUCCESS
} from '../../actions/const'
import { STATUS_DEFAULT, STATUS_ERROR, STATUS_LOADED, STATUS_LOADING } from '../consts'

const initialState = () => {
	return {
		items: [],
		status: STATUS_DEFAULT,
		error: null
	}
}

const addItem = (items, itemToAdd) => {
	items.unshift(itemToAdd)
	return items
}

export default function (state = initialState(), action) {
	switch (action.type) {
	case ACTION_ADD_CONSUMPTION_LOG_ITEM:
		return {
			...state,
			items: addItem(state.items, action.item),
			status: STATUS_LOADED,
			error: null

		}
	case ACTION_FETCH_CONSUMPTION_LOG_SUCCESS:
		return {
			...state,
			items: action.items || [],
			status: STATUS_LOADED,
			error: null

		}
	case ACTION_FETCH_CONSUMPTION_LOG_FAIL:
		return {
			...state,
			items: [],
			status: STATUS_ERROR,
			error: action.error

		}
	case ACTION_FETCH_CONSUMPTION_LOG_LOADING:
		return {
			...state,
			items: [],
			status: STATUS_LOADING,
			error: null
		}
	default:
		return state
	}
}
