import {
	ACTION_CREATE_CATEGORY_FAIL,
	ACTION_CREATE_CATEGORY_LOADING,
	ACTION_CREATE_CATEGORY_RESET,
	ACTION_CREATE_CATEGORY_SUCCESS,
	ACTION_FETCH_CATEGORIES_FAIL,
	ACTION_FETCH_CATEGORIES_LOADING,
	ACTION_FETCH_CATEGORIES_SUCCESS
} from './const'
import axios from 'axios'

const fetchCategoriesLoading = () => {
	return {
		type: ACTION_FETCH_CATEGORIES_LOADING
	}
}

const fetchCategoriesFail = error => {
	return {
		type: ACTION_FETCH_CATEGORIES_FAIL,
		error: error
	}
}

const fetchCategoriesSuccess = payload => {
	return {
		type: ACTION_FETCH_CATEGORIES_SUCCESS,
		payload: payload
	}
}

const createCategoryLoading = () => {
	return {
		type: ACTION_CREATE_CATEGORY_LOADING
	}
}

const createCategoryFail = error => {
	return {
		type: ACTION_CREATE_CATEGORY_FAIL,
		error: error
	}
}

const createCategorySuccess = category => {
	return {
		type: ACTION_CREATE_CATEGORY_SUCCESS,
		category: category
	}
}

export const resetCreateCategoryForm = () => {
	return {
		type: ACTION_CREATE_CATEGORY_RESET
	}
}

export const fetchCategories = () => {
	return (dispatch) => {
		dispatch(fetchCategoriesLoading())
		axios.get('/api/v1/category/', {})
			.then(response => {
				const data = response.data
				dispatch(fetchCategoriesSuccess(data.data))
			})
			.catch(error => {
				const errorMsq = error.message
				dispatch(fetchCategoriesFail(errorMsq))
			})
	}
}

export const createCategory = (title) => {
	return (dispatch) => {
		dispatch(createCategoryLoading())
		const json = JSON.stringify({ title })
		axios.post('/api/v1/category/', json)
			.then(response => {
				const data = response.data
				dispatch(createCategorySuccess(data.data))
			})
			.catch(error => {
				const errorMsq = error.message
				if (error.response && error.response.status === 400) {
					dispatch(createCategoryFail(error.response.data.error))
				} else {
					dispatch(createCategoryFail(errorMsq))
				}
			})
	}
}
