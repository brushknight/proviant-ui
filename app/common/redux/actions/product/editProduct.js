import {
	ACTION_EDIT_PRODUCT_FAIL,
	ACTION_EDIT_PRODUCT_FETCH_FAIL,
	ACTION_EDIT_PRODUCT_FETCHED,
	ACTION_EDIT_PRODUCT_FETCHING,
	ACTION_EDIT_PRODUCT_RESET,
	ACTION_EDIT_PRODUCT_SENDING,
	ACTION_EDIT_PRODUCT_SUCCESS
} from '../const'
import { generateCoreApiUrl, generateHeaders } from '../../../utils/link'
import { handleError } from '../../../utils/action'
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
		generateHeaders(locale).then(headers => {
			axios.get(generateCoreApiUrl(`/product/${id}/`), headers)
				.then(response => {
					const data = response.data
					dispatch(editProductFetched(data.data))
				})
				.catch(error => {
					handleError(dispatch, error, editProductFetchFail, editProductFetchFail, editProductFetchFail)
				})
		})
	}
}

export const updateProduct = (model, locale) => {
	return (dispatch) => {
		dispatch(editProductSending())
		const json = JSON.stringify(model)
		generateHeaders(locale).then(headers => {
			axios.put(generateCoreApiUrl(`/product/${model.id}/`), json, headers)
				.then(response => {
					const data = response.data
					dispatch(editProductSuccess(data.data))
					dispatch(updateProductInList(data.data))
				})
				.catch(error => {
					handleError(dispatch, error, editProductFail, editProductFail, editProductFail)
				})
		})
	}
}
