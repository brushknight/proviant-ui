import {
	ACTION_ADD_CONSUMPTION_LOG_ITEM,
	ACTION_FETCH_CONSUMPTION_LOG_FAIL,
	ACTION_FETCH_CONSUMPTION_LOG_LOADING,
	ACTION_FETCH_CONSUMPTION_LOG_SUCCESS
} from '../const'
import { generateCoreApiUrl } from '../../../utils/link'
import { generateLocaleHeader } from '../../../utils/i18n'
import axios from 'axios'

const fetchStockLoading = () => {
	return {
		type: ACTION_FETCH_CONSUMPTION_LOG_LOADING
	}
}

const fetchStockSuccess = (items) => {
	return {
		type: ACTION_FETCH_CONSUMPTION_LOG_SUCCESS,
		items: items
	}
}

const fetchStockFail = (error) => {
	return {
		type: ACTION_FETCH_CONSUMPTION_LOG_FAIL,
		error: error
	}
}
export const addConsumptionLogItem = (item) => {
	return {
		type: ACTION_ADD_CONSUMPTION_LOG_ITEM,
		item
	}
}

export const fetchConsumptionLog = (productId, locale) => {
	return (dispatch) => {
		dispatch(fetchStockLoading())
		axios.get(generateCoreApiUrl(`/product/${productId}/consumption_log/`), generateLocaleHeader(locale))
			.then(response => {
				const data = response.data
				dispatch(fetchStockSuccess(data.data))
			})
			.catch(error => {
				dispatch(fetchStockFail(error.message))
			})
	}
}
