import {
	ACTION_AMEND_PRODUCT_STOCK_IN_LIST, ACTION_DELETE_PRODUCT_IN_LIST,
	ACTION_FETCH_PRODUCTS_FAIL,
	ACTION_FETCH_PRODUCTS_LOADING,
	ACTION_FETCH_PRODUCTS_SUCCESS,
	ACTION_UPDATE_PRODUCT_IN_LIST,
	ACTION_UPDATE_PRODUCT_STOCK_IN_LIST
} from '../actions/const'
import { STATUS_DEFAULT, STATUS_ERROR, STATUS_LOADED, STATUS_LOADING } from './consts'

const initialState = () => {
	return {
		items: [],
		status: STATUS_DEFAULT,
		error: null
	}
}

export default function (state = initialState(), action) {
	let newItems

	switch (action.type) {
	case ACTION_AMEND_PRODUCT_STOCK_IN_LIST:

		newItems = state.items.map((item) => {
			if (Number(item.id) === Number(action.productId)) {
				item.stock += action.delta.quantity
			}

			return item
		})

		return {
			...state,
			items: newItems
		}
	case ACTION_DELETE_PRODUCT_IN_LIST:

		newItems = state.items.filter((item) => {
			return Number(item.id) !== Number(action.id)
		})

		return {
			...state,
			items: newItems
		}
	case ACTION_UPDATE_PRODUCT_STOCK_IN_LIST:

		newItems = state.items.map((item) => {
			if (Number(item.id) === Number(action.productId)) {
				if (action.items) {
					item.stock = 0
					action.items.forEach((stockItem) => {
						item.stock += stockItem.quantity
					})
				}
			}

			return item
		})

		return {
			...state,
			items: newItems
		}
	case ACTION_FETCH_PRODUCTS_FAIL:
		return {
			...state,
			error: action.error,
			status: STATUS_ERROR
		}
	case ACTION_UPDATE_PRODUCT_IN_LIST:

		newItems = state.items.map((item) => {
			if (Number(item.id) === Number(action.item.id)) {
				return action.item
			}
			return item
		})

		return {
			...state,
			items: newItems
		}
	case ACTION_FETCH_PRODUCTS_LOADING:
		return {
			...state,
			status: STATUS_LOADING,
			error: null
		}

	case ACTION_FETCH_PRODUCTS_SUCCESS:
		return {
			...state,
			items: action.payload,
			status: STATUS_LOADED,
			error: null
		}

	default:
		return state
	}
}
