import {
	ACTION_EDIT_CATEGORY_FAIL,
	ACTION_EDIT_CATEGORY_FETCH_FAIL,
	ACTION_EDIT_CATEGORY_FETCHED,
	ACTION_EDIT_CATEGORY_FETCHING,
	ACTION_EDIT_CATEGORY_RESET,
	ACTION_EDIT_CATEGORY_SENDING,
	ACTION_EDIT_CATEGORY_SUCCESS
} from './const'
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

export const editCategoryReset = (error) => {
	return {
		type: ACTION_EDIT_CATEGORY_RESET,
		error: error
	}
}

export const fetchEditCategory = (id) => {
	return (dispatch) => {
		dispatch(editCategoryFetching())
		axios.get('/api/v1/category/' + id + '/', {
			headers: {}
		})
			.then(response => {
				const data = response.data
				dispatch(editCategoryFetched(data.data))
			})
			.catch(error => {
				const errorMsq = error.message
				if (error.response.status === 404) {
					dispatch(editCategoryFetchFail(error.response.data.error))
				} else {
					dispatch(editCategoryFetchFail(errorMsq))
				}
			})
	}
}

export const updateCategory = (id, title) => {
	return (dispatch) => {
		dispatch(editCategorySending())
		const json = JSON.stringify({
			id, title
		})
		axios.put(`/api/v1/category/${id}/`, json)
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
