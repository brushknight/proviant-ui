import {
	ACTION_DELETE_PRODUCT_FAIL,
	ACTION_DELETE_PRODUCT_LOADING,
	ACTION_DELETE_PRODUCT_SUCCESS,
	ACTION_FETCH_PRODUCT_FAIL,
	ACTION_FETCH_PRODUCT_LOADING,
	ACTION_FETCH_PRODUCT_NOT_FOUND,
	ACTION_FETCH_PRODUCT_SUCCESS, ACTION_RESET_PRODUCT
} from './const'
import axios from 'axios'

const fetchProductLoading = () => {
	return {
		type: ACTION_FETCH_PRODUCT_LOADING
	}
}

const fetchProductFail = error => {
	return {
		type: ACTION_FETCH_PRODUCT_FAIL,
		error: error
	}
}
const fetchProductNotFound = error => {
	return {
		type: ACTION_FETCH_PRODUCT_NOT_FOUND,
		error: error
	}
}

const fetchProductSuccess = model => {
	return {
		type: ACTION_FETCH_PRODUCT_SUCCESS,
		model: model
	}
}

const deleteProductSuccess = (model) => {
	return {
		type: ACTION_DELETE_PRODUCT_SUCCESS,
		model: model
	}
}
const deleteProductFail = (error) => {
	return {
		type: ACTION_DELETE_PRODUCT_FAIL,
		error: error
	}
}

const deleteProductLoading = () => {
	return {
		type: ACTION_DELETE_PRODUCT_LOADING
	}
}

export const resetProduct = () => {
	return {
		type: ACTION_RESET_PRODUCT
	}
}

export const fetchProduct = (id) => {
	return (dispatch) => {
		dispatch(fetchProductLoading())
		axios.get('/api/v1/product/' + id + '/', {
			headers: {}
		})
			.then(response => {
				const data = response.data
				dispatch(fetchProductSuccess(data.data))
			})
			.catch(error => {
				const errorMsq = error.message
				if (error.response.status === 404) {
					dispatch(fetchProductNotFound(error.response.data.error))
				} else {
					dispatch(fetchProductFail(errorMsq))
				}
			})
	}
}

export const deleteProduct = (id) => {
	return (dispatch) => {
		dispatch(deleteProductLoading())
		axios.delete(`/api/v1/product/${id}/`)
			.then(response => {
				const data = response.data
				dispatch(deleteProductSuccess())
			})
			.catch(error => {
				const errorMsq = error.message
				dispatch(deleteProductFail(errorMsq))
			})
	}
}
