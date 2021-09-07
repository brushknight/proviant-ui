import {
	ACTION_AMEND_PRODUCT_STOCK,
	ACTION_DELETE_PRODUCT_FAIL,
	ACTION_DELETE_PRODUCT_LOADING,
	ACTION_DELETE_PRODUCT_SUCCESS,
	ACTION_FETCH_PRODUCT_FAIL,
	ACTION_FETCH_PRODUCT_LOADING,
	ACTION_FETCH_PRODUCT_NOT_FOUND,
	ACTION_FETCH_PRODUCT_SUCCESS, ACTION_RESET_PRODUCT, ACTION_UPDATE_PRODUCT_STOCK
} from '../actions/const'
import { STATUS_DEFAULT, STATUS_ERROR, STATUS_LOADED, STATUS_LOADING, STATUS_NOT_FOUND, STATUS_SUCCESS } from './consts'

const emptyModel = () => {
	return {
		id: 0,
		title: '',
		description: '',
		link: '',
		image: '',
		barcode: '',
		category_ids: [],
		categories: [],
		list_id: '',
		list: '',
		stock: 0
	}
}

const initialState = () => {
	return {
		model: emptyModel(),
		status: STATUS_DEFAULT,
		error: '',
		deleteStatus: STATUS_DEFAULT
	}
}

export default function (state = initialState(), action) {
	let newProduct

	switch (action.type) {
	case ACTION_AMEND_PRODUCT_STOCK:

		newProduct = state.model

		newProduct.stock += action.delta.quantity

		return {
			...state,
			model: newProduct
		}
	case ACTION_UPDATE_PRODUCT_STOCK:

		newProduct = state.model

		newProduct.stock = 0

		if (action.items) {
			action.items.forEach((item) => {
				newProduct.stock += item.quantity
			})
		}

		return {
			...state,
			model: newProduct
		}
	case ACTION_RESET_PRODUCT:
		return {
			...initialState()
		}
	case ACTION_FETCH_PRODUCT_FAIL:
		return {
			...state,
			error: action.error,
			status: STATUS_ERROR,
			deleteStatus: STATUS_DEFAULT
		}
	case ACTION_FETCH_PRODUCT_NOT_FOUND:
		return {
			...state,
			error: action.error,
			status: STATUS_NOT_FOUND,
			deleteStatus: STATUS_DEFAULT
		}
	case ACTION_FETCH_PRODUCT_LOADING:
		return {
			...state,
			status: STATUS_LOADING,
			error: null,
			deleteStatus: STATUS_DEFAULT
		}

	case ACTION_FETCH_PRODUCT_SUCCESS:
		return {
			...state,
			model: action.model,

			status: STATUS_LOADED,
			error: null,
			deleteStatus: STATUS_DEFAULT
		}
	case ACTION_DELETE_PRODUCT_LOADING:
		return {
			...state,
			deleteStatus: STATUS_LOADING
		}
	case ACTION_DELETE_PRODUCT_FAIL:
		return {
			...state,
			error: action.error,
			deleteStatus: STATUS_ERROR
		}
	case ACTION_DELETE_PRODUCT_SUCCESS:
		return {
			...initialState(),
			deleteStatus: STATUS_SUCCESS
		}
	default:
		return state
	}
}
