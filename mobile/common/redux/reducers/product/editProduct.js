import {
	ACTION_EDIT_PRODUCT_FAIL, ACTION_EDIT_PRODUCT_FETCH_FAIL,
	ACTION_EDIT_PRODUCT_FETCHED,
	ACTION_EDIT_PRODUCT_FETCHING,
	ACTION_EDIT_PRODUCT_RESET,
	ACTION_EDIT_PRODUCT_SENDING,
	ACTION_EDIT_PRODUCT_SUCCESS
} from '../../actions/const'
import {
	STATUS_DEFAULT,
	STATUS_ERROR,
	STATUS_FETCH_FAILED,
	STATUS_FETCHED,
	STATUS_FETCHING,
	STATUS_SENDING,
	STATUS_UPDATED
} from '../consts'

const emptyModel = () => {
	return {
		title: '',
		description: '',
		link: '',
		image: '',
		barcode: '',
		category_ids: [],
		categories: [],
		list_id: '',
		list: ''
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
	case ACTION_EDIT_PRODUCT_RESET:
		return {
			...initialState()
		}
	case ACTION_EDIT_PRODUCT_FETCHED:
		return {
			...initialState(),
			model: action.model,
			status: STATUS_FETCHED
		}
	case ACTION_EDIT_PRODUCT_FETCHING:
		return {
			...initialState(),
			model: emptyModel(),
			status: STATUS_FETCHING
		}
	case ACTION_EDIT_PRODUCT_SENDING:
		return {
			...state,
			status: STATUS_SENDING

		}
	case ACTION_EDIT_PRODUCT_FETCH_FAIL:
		return {
			...initialState(),
			status: STATUS_FETCH_FAILED,
			error: action.error
		}
	case ACTION_EDIT_PRODUCT_FAIL:
		return {
			...initialState(),
			status: STATUS_ERROR,
			error: action.error
		}
	case ACTION_EDIT_PRODUCT_SUCCESS:
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
