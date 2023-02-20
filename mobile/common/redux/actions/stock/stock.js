import {
	ACTION_ADD_STOCK_FAIL,
	ACTION_ADD_STOCK_LOADING,
	ACTION_ADD_STOCK_SUCCESS,
	ACTION_CONSUME_STOCK_FAIL,
	ACTION_CONSUME_STOCK_LOADING,
	ACTION_CONSUME_STOCK_SUCCESS,
	ACTION_DELETE_STOCK_FAIL,
	ACTION_DELETE_STOCK_LOADING,
	ACTION_DELETE_STOCK_SUCCESS,
	ACTION_FETCH_STOCK_FAIL,
	ACTION_FETCH_STOCK_LOADING,
	ACTION_FETCH_STOCK_NOT_FOUND,
	ACTION_FETCH_STOCK_SUCCESS
} from '../const'
import { addConsumptionLogItem } from '../consumption/log'
import { amendProductStock, updateProductStock } from '../product/product'
import { amendProductStockInList, updateProductStockInList } from '../product/products'
import { generateCoreApiUrl, generateHeaders } from '../../../utils/link'
import { handleError } from '../../../utils/action'
import axios from 'axios'

const fetchStockLoading = () => {
	return {
		type: ACTION_FETCH_STOCK_LOADING
	}
}

const fetchStockSuccess = (items) => {
	return {
		type: ACTION_FETCH_STOCK_SUCCESS,
		items: items
	}
}

const fetchStockFail = (error) => {
	return {
		type: ACTION_FETCH_STOCK_FAIL,
		error: error
	}
}
const fetchStockNotFound = (error) => {
	return {
		type: ACTION_FETCH_STOCK_NOT_FOUND,
		error: error
	}
}

const addStockLoading = () => {
	return {
		type: ACTION_ADD_STOCK_LOADING
	}
}
const addStockSuccess = (item) => {
	return {
		type: ACTION_ADD_STOCK_SUCCESS,
		item: item
	}
}
const addStockFail = (error) => {
	return {
		type: ACTION_ADD_STOCK_FAIL,
		error: error
	}
}

const deleteStockLoading = () => {
	return {
		type: ACTION_DELETE_STOCK_LOADING
	}
}
const deleteStockSuccess = (items) => {
	return {
		type: ACTION_DELETE_STOCK_SUCCESS,
		items: items
	}
}
const deleteStockFail = (error) => {
	return {
		type: ACTION_DELETE_STOCK_FAIL,
		error: error
	}
}

const consumeStockLoading = () => {
	return {
		type: ACTION_CONSUME_STOCK_LOADING
	}
}
const consumeStockSuccess = (items) => {
	return {
		type: ACTION_CONSUME_STOCK_SUCCESS,
		items: items
	}
}
const consumeStockFail = (error) => {
	return {
		type: ACTION_CONSUME_STOCK_FAIL,
		error: error
	}
}

export const fetchStock = (productId, locale) => {
	return (dispatch) => {
		dispatch(fetchStockLoading())
		generateHeaders(locale).then(headers => {
			axios.get(generateCoreApiUrl(`/product/${productId}/stock/`), headers)
				.then(response => {
					const data = response.data
					dispatch(fetchStockSuccess(data.data))
				})
				.catch(error => {
					handleError(dispatch, error, fetchStockFail, fetchStockNotFound, fetchStockFail)
				})
		})
	}
}

export const addStock = (productId, quantity, date, locale) => {
	const dto = {
		quantity: quantity,
		expire: Math.round((+date) / 1000)
	}

	return (dispatch) => {
		dispatch(addStockLoading())
		const json = JSON.stringify(dto)
		generateHeaders(locale).then(headers => {
			axios.post(generateCoreApiUrl(`/product/${productId}/add/`), json, headers)
				.then(response => {
					const data = response.data
					dispatch(addStockSuccess(data.data))
					dispatch(amendProductStock(productId, data.data))
					dispatch(amendProductStockInList(productId, data.data))
				})
				.catch(error => {
					handleError(dispatch, error, addStockFail, addStockFail, addStockFail)
				})
		})
	}
}

export const consumeStock = (productId, quantity, locale) => {
	const dto = {
		quantity
	}

	return (dispatch) => {
		dispatch(consumeStockLoading())
		const json = JSON.stringify(dto)
		generateHeaders(locale).then(headers => {
			axios.post(generateCoreApiUrl(`/product/${productId}/consume/`), json, headers)
				.then(response => {
					const data = response.data
					dispatch(consumeStockSuccess(data.data.stock))
					dispatch(updateProductStock(productId, data.data.stock))
					dispatch(updateProductStockInList(productId, data.data.stock))
					dispatch(addConsumptionLogItem(data.data.consumed_log_item))
				})
				.catch(error => {
					handleError(dispatch, error, consumeStockFail, consumeStockFail, consumeStockFail)
				})
		})
	}
}

export const deleteStock = (productId, id, locale) => {
	return (dispatch) => {
		dispatch(deleteStockLoading())
		generateHeaders(locale).then(headers => {
			axios.delete(generateCoreApiUrl(`/product/${productId}/stock/${id}/`), headers)
				.then(response => {
					const data = response.data
					dispatch(deleteStockSuccess(data.data))
				})
				.catch(error => {
					handleError(dispatch, error, deleteStockFail, deleteStockFail, deleteStockFail)
				})
		})
	}
}
