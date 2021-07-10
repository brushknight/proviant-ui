import {
	ACTION_EDIT_PRODUCT_FAIL,
	ACTION_EDIT_PRODUCT_FETCHED,
	ACTION_EDIT_PRODUCT_FETCHING,
	ACTION_EDIT_PRODUCT_RESET,
	ACTION_EDIT_PRODUCT_SENDING,
	ACTION_EDIT_PRODUCT_SUCCESS
} from './const'
import { generateLocaleHeader } from '../../utils/i18n'
import { updateProductInList } from './products'
import axios from 'axios'

const editProductSending = () => {
	return {
		type: ACTION_EDIT_PRODUCT_SENDING
	}
}
const editProductSuccess = (model) => {
	return {
		type: ACTION_EDIT_PRODUCT_SUCCESS,
		model: model
	}
}
const editProductFetching = () => {
	return {
		type: ACTION_EDIT_PRODUCT_FETCHING
	}
}
const editProductFetched = (model) => {
	return {
		type: ACTION_EDIT_PRODUCT_FETCHED,
		model: model
	}
}
const editProductFail = (error) => {
	return {
		type: ACTION_EDIT_PRODUCT_FAIL,
		error: error
	}
}
export const editProductFormReset = () => {
	return {
		type: ACTION_EDIT_PRODUCT_RESET
	}
}
export const fetchEditProduct = (id, locale) => {
	return (dispatch) => {
		dispatch(editProductFetching())
		axios.get('/api/v1/product/' + id + '/', generateLocaleHeader(locale))
			.then(response => {
				const data = response.data
				dispatch(editProductFetched(data.data))
			})
			.catch(error => {
				const errorMsq = error.message
				if (error.response.status === 404) {
					dispatch(editProductFail(error.response.data.error))
				} else {
					dispatch(editProductFail(errorMsq))
				}
			})
	}
}

export const updateProduct = (model) => {
	return (dispatch) => {
		dispatch(editProductSending())
		const json = JSON.stringify(model)
		axios.put(`/api/v1/product/${model.id}/`, json)
			.then(response => {
				const data = response.data
				dispatch(editProductSuccess(data.data))
				dispatch(updateProductInList(data.data))
			})
			.catch(error => {
				const errorMsq = error.message
				dispatch(editProductFail(errorMsq))
			})
	}
}
