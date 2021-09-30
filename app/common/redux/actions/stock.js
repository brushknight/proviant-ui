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
} from './const'
import { addConsumptionLogItem } from './consumption/log'
import { amendProductStock, updateProductStock } from './product/product'
import { amendProductStockInList, updateProductStockInList } from './product/products'
import { generateCoreApiUrl } from '../../utils/link'
import { generateLocaleHeader } from '../../utils/i18n'
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
		axios.get(generateCoreApiUrl(`/product/${productId}/stock/`), generateLocaleHeader(locale))
			.then(response => {
				const data = response.data
				dispatch(fetchStockSuccess(data.data))
			})
			.catch(error => {
				if (error.response && error.response.status === 404) {
					dispatch(fetchStockNotFound(error.response.data.error))
				} else {
					dispatch(fetchStockFail(error.message))
				}
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
		axios.post(generateCoreApiUrl(`/product/${productId}/add/`), json, generateLocaleHeader(locale))
			.then(response => {
				const data = response.data
				dispatch(addStockSuccess(data.data))
				dispatch(amendProductStock(productId, data.data))
				dispatch(amendProductStockInList(productId, data.data))
			})
			.catch(error => {
				if (error.response && error.response.status) {
					dispatch(addStockFail(error.response.data.error))
				} else {
					dispatch(addStockFail(error.message))
				}
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
		axios.post(generateCoreApiUrl(`/product/${productId}/consume/`), json, generateLocaleHeader(locale))
			.then(response => {
				const data = response.data
				dispatch(consumeStockSuccess(data.data.stock))
				dispatch(updateProductStock(productId, data.data.stock))
				dispatch(updateProductStockInList(productId, data.data.stock))
				dispatch(addConsumptionLogItem(data.data.consumed_log_item))
			})
			.catch(error => {
				if (error.response && error.response.status) {
					dispatch(consumeStockFail(error.response.data.error))
				} else {
					dispatch(consumeStockFail(error.message))
				}
			})
	}
}

export const deleteStock = (productId, id, locale) => {
	return (dispatch) => {
		dispatch(deleteStockLoading())
		axios.delete(generateCoreApiUrl(`/product/${productId}/stock/${id}/`), generateLocaleHeader(locale))
			.then(response => {
				const data = response.data
				dispatch(deleteStockSuccess(data.data))
			})
			.catch(error => {
				if (error.response && error.response.status) {
					dispatch(deleteStockFail(error.response.data.error))
				} else {
					dispatch(deleteStockFail(error.message))
				}
			})
	}
}
