import {
	ACTION_CREATE_PRODUCT_FAIL,
	ACTION_CREATE_PRODUCT_RESET,
	ACTION_CREATE_PRODUCT_SENDING,
	ACTION_CREATE_PRODUCT_SUCCESS
} from './const'
import { generateLocaleHeader } from '../../utils/i18n'
import axios from 'axios'

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
		dispatch(createProductSending())
		const json = JSON.stringify(model)
		axios.post('/api/v1/product/', json, generateLocaleHeader(locale))
			.then(response => {
				const data = response.data
				dispatch(createProductSuccess(data.data))
			})
			.catch(error => {
				if (error.response.status && error.response.data.error) {
					dispatch(createProductFail(error.response.data.error))
				} else {
					const errorMsq = error.message
					dispatch(createProductFail(errorMsq))
				}
			})
	}
}
