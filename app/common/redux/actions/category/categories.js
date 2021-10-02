import {
	ACTION_CREATE_CATEGORY_FAIL,
	ACTION_CREATE_CATEGORY_LOADING,
	ACTION_CREATE_CATEGORY_RESET,
	ACTION_CREATE_CATEGORY_SUCCESS,
	ACTION_FETCH_CATEGORIES_FAIL,
	ACTION_FETCH_CATEGORIES_LOADING,
	ACTION_FETCH_CATEGORIES_SUCCESS,
	ACTION_UPDATE_CATEGORY_IN_LIST
} from '../const'
import { generateCoreApiUrl, generateHeaders } from '../../../utils/link'
import { userUnauthorized } from '../user'
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

export const updateCategoryInList = (model) => {
	return {
		type: ACTION_UPDATE_CATEGORY_IN_LIST,
		model: model
	}
}

export const fetchCategories = (locale) => {
	return (dispatch) => {
		dispatch(fetchCategoriesLoading())
		generateHeaders(locale).then(headers => {
			axios.get(generateCoreApiUrl('/category/'), headers)
				.then(response => {
					const data = response.data
					dispatch(fetchCategoriesSuccess(data.data))
				})
				.catch(error => {
					const errorMsq = error.message

					if (error.response) {
						switch (error.response.status) {
						case 400:
							dispatch(fetchCategoriesFail(error.response.data.error))
							break
						case 401:
							dispatch(userUnauthorized())
							break
						default:
							dispatch(fetchCategoriesFail(error.response.data.error))
						}
					} else {
						fetchCategoriesFail(errorMsq)
					}
				})
		})
	}
}

export const createCategory = (title, locale) => {
	return (dispatch) => {
		dispatch(createCategoryLoading())
		const json = JSON.stringify({ title })
		generateHeaders(locale).then(headers => {
			axios.post(generateCoreApiUrl('/category/'), json, headers)
				.then(response => {
					const data = response.data
					dispatch(createCategorySuccess(data.data))
				})
				.catch(error => {
					const errorMsq = error.message

					if (error.response) {
						switch (error.response.status) {
						case 400:
							dispatch(createCategoryFail(error.response.data.error))
							break
						case 401:
							dispatch(userUnauthorized())
							break
						default:
							dispatch(createCategoryFail(error.response.data.error))
						}
					} else {
						createCategoryFail(errorMsq)
					}
				})
		})
	}
}
