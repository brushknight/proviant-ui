import {
	ACTION_ADD_PRODUCT_IN_LIST,
	ACTION_AMEND_PRODUCT_STOCK_IN_LIST,
	ACTION_DELETE_PRODUCT_IN_LIST,
	ACTION_FETCH_PRODUCTS_FAIL,
	ACTION_FETCH_PRODUCTS_LOADING,
	ACTION_FETCH_PRODUCTS_SUCCESS,
	ACTION_UPDATE_PRODUCT_IN_LIST,
	ACTION_UPDATE_PRODUCT_STOCK_IN_LIST
} from '../../actions/const'
import { STATUS_DEFAULT, STATUS_ERROR, STATUS_LOADED, STATUS_LOADING } from '../consts'

const initialState = () => {
	return {
		items: [],
		status: STATUS_DEFAULT,
		error: null
	}
}

function compareItems (a, b) {
	if (a.stock < b.stock) {
		return 1
	}
	if (a.stock > b.stock) {
		return -1
	}
	return 0
}

const transform = (items) => {
	return items.sort(compareItems)
}

const addItem = (items, itemToAdd) => {
	items.unshift(itemToAdd)

	return items
}

const updateStock = (items, id, stockItems) => {
	return items.map((item) => {
		if (Number(item.id) === Number(id)) {
			if (stockItems) {
				item.stock = 0
				stockItems.forEach((stockItem) => {
					item.stock += stockItem.quantity
				})
			}
		}

		return {
			...item
		}
	})
}

const updateItem = (items, itemToUpdate) => {
	return items.map((item) => {
		if (Number(item.id) === Number(itemToUpdate.id)) {
			return itemToUpdate
		}
		return item
	})
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
			items: transform(newItems)
		}
	case ACTION_DELETE_PRODUCT_IN_LIST:

		newItems = state.items.filter((item) => {
			return Number(item.id) !== Number(action.id)
		})

		return {
			...state,
			items: transform(newItems)
		}
	case ACTION_UPDATE_PRODUCT_STOCK_IN_LIST:

		return {
			...state,
			items: transform(updateStock(state.items, action.productId, action.items))
		}
	case ACTION_FETCH_PRODUCTS_FAIL:
		return {
			...state,
			error: action.error,
			status: STATUS_ERROR
		}
	case ACTION_UPDATE_PRODUCT_IN_LIST:

		return {
			...state,
			items: transform(updateItem(state.items, action.item))
		}
	case ACTION_ADD_PRODUCT_IN_LIST:

		return {
			...state,
			items: transform(addItem(state.items, action.item))
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
			items: transform(action.payload || []),
			status: STATUS_LOADED,
			error: null
		}
	default:
		return state
	}
}
