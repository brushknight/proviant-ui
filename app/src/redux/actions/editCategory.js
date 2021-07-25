import {
	ACTION_DELETE_CATEGORY_FAIL,
	ACTION_DELETE_CATEGORY_IN_LIST,
	ACTION_DELETE_CATEGORY_SUCCESS,
	ACTION_EDIT_CATEGORY_FAIL,
	ACTION_EDIT_CATEGORY_FETCH_FAIL,
	ACTION_EDIT_CATEGORY_FETCHED,
	ACTION_EDIT_CATEGORY_FETCHING,
	ACTION_EDIT_CATEGORY_RESET,
	ACTION_EDIT_CATEGORY_SENDING,
	ACTION_EDIT_CATEGORY_SUCCESS
} from './const'
import { generateApiUrl } from '../../utils/link'
import { generateLocaleHeader } from '../../utils/i18n'
import { updateCategoryInList } from './categories'
import axios from 'axios'

const editCategorySending = () => {
	return {
		type: ACTION_EDIT_CATEGORY_SENDING
	}
}
const editCategorySuccess = (model) => {
	return {
		type: ACTION_EDIT_CATEGORY_SUCCESS,
		model: model
	}
}
const editCategoryFetching = () => {
	return {
		type: ACTION_EDIT_CATEGORY_FETCHING
	}
}
const editCategoryFetched = (model) => {
	return {
		type: ACTION_EDIT_CATEGORY_FETCHED,
		model: model
	}
}
const editCategoryFetchFail = (error) => {
	return {
		type: ACTION_EDIT_CATEGORY_FETCH_FAIL,
		error: error
	}
}
const editCategoryFail = (error) => {
	return {
		type: ACTION_EDIT_CATEGORY_FAIL,
		error: error
	}
}
const deleteCategorySuccess = (error) => {
	return {
		type: ACTION_DELETE_CATEGORY_SUCCESS,
		error: error
	}
}
const deleteCategoryInList = (id) => {
	return {
		type: ACTION_DELETE_CATEGORY_IN_LIST,
		id
	}
}
const deleteCategoryFail = (error) => {
	return {
		type: ACTION_DELETE_CATEGORY_FAIL,
		error: error
	}
}

export const editCategoryReset = (error) => {
	return {
		type: ACTION_EDIT_CATEGORY_RESET,
		error: error
	}
}

export const fetchEditCategory = (id, locale) => {
	return (dispatch) => {
		dispatch(editCategoryFetching())
		axios.get(generateApiUrl(`/category/${id}/`), generateLocaleHeader(locale))
			.then(response => {
				const data = response.data
				dispatch(editCategoryFetched(data.data))
			})
			.catch(error => {
				const errorMsq = error.message
				if (error.response && error.response.status === 404) {
					dispatch(editCategoryFetchFail(error.response.data.error))
				} else {
					dispatch(editCategoryFetchFail(errorMsq))
				}
			})
	}
}

export const updateCategory = (id, title, locale) => {
	return (dispatch) => {
		dispatch(editCategorySending())
		const json = JSON.stringify({
			id, title
		})
		axios.put(generateApiUrl(`/category/${id}/`), json, generateLocaleHeader(locale))
			.then(response => {
				const data = response.data
				dispatch(editCategorySuccess(data.data))
				dispatch(updateCategoryInList(data.data))
			})
			.catch(error => {
				const errorMsq = error.message
				if (error.response && error.response.status) {
					dispatch(editCategoryFail(error.response.data.error))
				} else {
					dispatch(editCategoryFail(errorMsq))
				}
			})
	}
}

export const deleteCategory = (id, locale) => {
	return (dispatch) => {
		axios.delete(generateApiUrl(`/category/${id}/`), generateLocaleHeader(locale))
			.then(response => {
				const data = response.data
				dispatch(deleteCategorySuccess(data.data))
				dispatch(deleteCategoryInList(id))
			})
			.catch(error => {
				const errorMsq = error.message
				if (error.response && error.response.status) {
					dispatch(deleteCategoryFail(error.response.data.error))
				} else {
					dispatch(deleteCategoryFail(errorMsq))
				}
			})
	}
}
