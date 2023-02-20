import {
	ACTION_CREATE_LIST_FAIL,
	ACTION_CREATE_LIST_LOADING,
	ACTION_CREATE_LIST_RESET,
	ACTION_CREATE_LIST_SUCCESS,
	ACTION_FETCH_LIST_FAIL,
	ACTION_FETCH_LIST_LOADING,
	ACTION_FETCH_LIST_SUCCESS,
	ACTION_UPDATE_LIST_IN_LIST
} from '../const'
import { generateCoreApiUrl, generateHeaders } from '../../../utils/link'
import { handleError } from '../../../utils/action'
import axios from 'axios'

const fetchListLoading = () => {
	return {
		type: ACTION_FETCH_LIST_LOADING
	}
}

const fetchListFail = error => {
	return {
		type: ACTION_FETCH_LIST_FAIL,
		error: error
	}
}

const fetchListSuccess = payload => {
	return {
		type: ACTION_FETCH_LIST_SUCCESS,
		payload: payload
	}
}

const createListLoading = () => {
	return {
		type: ACTION_CREATE_LIST_LOADING
	}
}

const createListFail = error => {
	return {
		type: ACTION_CREATE_LIST_FAIL,
		error: error
	}
}

const createListSuccess = list => {
	return {
		type: ACTION_CREATE_LIST_SUCCESS,
		list: list
	}
}

export const updateListInList = model => {
	return {
		type: ACTION_UPDATE_LIST_IN_LIST,
		model
	}
}
export const resetCreateListForm = () => {
	return {
		type: ACTION_CREATE_LIST_RESET
	}
}

export const fetchLists = (locale) => {
	return (dispatch) => {
		dispatch(fetchListLoading())
		generateHeaders(locale).then(headers => {
			axios.get(generateCoreApiUrl('/list/'), headers)
				.then(response => {
					const data = response.data
					dispatch(fetchListSuccess(data.data))
				})
				.catch(error => {
					handleError(dispatch, error, fetchListFail, fetchListFail, fetchListFail)
				})
		})
	}
}

export const createList = (title, locale) => {
	return (dispatch) => {
		dispatch(createListLoading())
		const json = JSON.stringify({ title })
		generateHeaders(locale).then(headers => {
			axios.post(generateCoreApiUrl('/list/'), json, headers)
				.then(response => {
					const data = response.data
					dispatch(createListSuccess(data.data))
				})
				.catch(error => {
					handleError(dispatch, error, createListFail, createListFail, createListFail)
				})
		})
	}
}
