import {
	ACTION_EDIT_PRODUCT_FAIL, ACTION_EDIT_PRODUCT_FETCH_FAIL,
	ACTION_EDIT_PRODUCT_FETCHED,
	ACTION_EDIT_PRODUCT_FETCHING,
	ACTION_EDIT_PRODUCT_RESET,
	ACTION_EDIT_PRODUCT_SENDING,
	ACTION_EDIT_PRODUCT_SUCCESS
} from '../const'
import { generateCoreApiUrl } from '../../../utils/link'
import { generateLocaleHeader } from '../../../utils/i18n'
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
const editProductFetchFail = (error) => {
	return {
		type: ACTION_EDIT_PRODUCT_FETCH_FAIL,
		error: error
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
		axios.get(generateCoreApiUrl(`/product/${id}/`), generateLocaleHeader(locale))
			.then(response => {
				const data = response.data
				dispatch(editProductFetched(data.data))
			})
			.catch(error => {
				const errorMsq = error.message
				if (error.response && error.response.status === 404) {
					dispatch(editProductFetchFail(error.response.data.error))
				} else {
					dispatch(editProductFetchFail(errorMsq))
				}
			})
	}
}

export const updateProduct = (model) => {
	return (dispatch) => {
		dispatch(editProductSending())
		const json = JSON.stringify(model)
		axios.put(generateCoreApiUrl(`/product/${model.id}/`), json)
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
