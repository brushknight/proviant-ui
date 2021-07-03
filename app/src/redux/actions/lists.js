import {
	ACTION_CHANGE_CREATE_LIST_FORM,
	ACTION_CREATE_LIST_FAIL,
	ACTION_CREATE_LIST_LOADING,
	ACTION_CREATE_LIST_SUCCESS,
	ACTION_FETCH_LIST_FAIL,
	ACTION_FETCH_LIST_LOADING,
	ACTION_FETCH_LIST_SUCCESS, ACTION_UPDATE_LIST_IN_LIST
} from './const'
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

export const fetchLists = () => {
	return (dispatch) => {
		dispatch(fetchListLoading())
		axios.get('/api/v1/list/', {
			headers: {}
		})
			.then(response => {
				const data = response.data
				dispatch(fetchListSuccess(data.data))
			})
			.catch(error => {
				const errorMsq = error.message
				dispatch(fetchListFail(errorMsq))
			})
	}
}

export const createList = (title) => {
	return (dispatch) => {
		dispatch(createListLoading())
		const json = JSON.stringify({ title })
		axios.post('/api/v1/list/', json)
			.then(response => {
				const data = response.data
				dispatch(createListSuccess(data.data))
			})
			.catch(error => {
				if (error.response.status === 400) {
					dispatch(createListFail(error.response.data.error))
				} else {
					dispatch(createListFail(error.message))
				}
			})
	}
}
