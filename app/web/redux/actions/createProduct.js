import {
	ACTION_CREATE_PRODUCT_FAIL,
	ACTION_CREATE_PRODUCT_RESET,
	ACTION_CREATE_PRODUCT_SENDING,
	ACTION_CREATE_PRODUCT_SUCCESS, ACTION_CREATE_PRODUCT_WITH_TITLE
} from './const'
import { generateCoreApiUrl } from '../../utils/link'
import { generateLocaleHeader } from '../../utils/i18n'
import { validateProduct } from '../../validators/product'
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
		axios.post(generateCoreApiUrl('/product/'), json, generateLocaleHeader(locale))
			.then(response => {
				const data = response.data
				dispatch(createProductSuccess(data.data))
			})
			.catch(error => {
				if (error.response && error.response.status && error.response.data.error) {
					dispatch(createProductFail(error.response.data.error))
				} else {
					const errorMsq = error.message
					dispatch(createProductFail(errorMsq))
				}
			})
	}
}
