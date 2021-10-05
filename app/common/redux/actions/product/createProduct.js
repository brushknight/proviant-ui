import {
	ACTION_CREATE_PRODUCT_FAIL,
	ACTION_CREATE_PRODUCT_RESET,
	ACTION_CREATE_PRODUCT_SENDING,
	ACTION_CREATE_PRODUCT_SUCCESS,
	ACTION_CREATE_PRODUCT_WITH_TITLE
} from '../const'
import { addProductInList } from './products'
import { generateCoreApiUrl, generateHeaders } from '../../../utils/link'
import { handleError } from '../../../utils/action'
import { validateProduct } from '../../../validators/product'
import axios from 'axios'

export const createProductWithTitle = (title) => {
	return {
		type: ACTION_CREATE_PRODUCT_WITH_TITLE,
		title
	}
}

const createProductSending = () => {
	return {
		type: ACTION_CREATE_PRODUCT_SENDING
	}
}
const createProductSuccess = (model) => {
	return {
		type: ACTION_CREATE_PRODUCT_SUCCESS,
		model: model
	}
}

const createProductFail = (error) => {
	return {
		type: ACTION_CREATE_PRODUCT_FAIL,
		error: error
	}
}

export const createProductFormReset = () => {
	return {
		type: ACTION_CREATE_PRODUCT_RESET
	}
}

export const createProduct = (model, locale) => {
	return (dispatch) => {
		const error = validateProduct(model)

		if (error) {
			dispatch(createProductFail(error))
			return
		}

		dispatch(createProductSending())
		const json = JSON.stringify(model)
		generateHeaders(locale).then(headers => {
			axios.post(generateCoreApiUrl('/product/'), json, headers)
				.then(response => {
					const data = response.data
					dispatch(createProductSuccess(data.data))
					dispatch(addProductInList(data.data))
				})
				.catch(error => {
					handleError(dispatch, error, createProductFail, createProductFail, createProductFail)
				})
		})
	}
}
