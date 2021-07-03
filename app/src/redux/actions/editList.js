import {
	ACTION_EDIT_LIST_FAIL,
	ACTION_EDIT_LIST_FETCH_FAIL,
	ACTION_EDIT_LIST_FETCHED,
	ACTION_EDIT_LIST_FETCHING,
	ACTION_EDIT_LIST_RESET,
	ACTION_EDIT_LIST_SENDING,
	ACTION_EDIT_LIST_SUCCESS
} from './const'
import { updateListInList } from './lists'
import axios from 'axios'

const editListSending = () => {
	return {
		type: ACTION_EDIT_LIST_SENDING
	}
}
const editListSuccess = (model) => {
	return {
		type: ACTION_EDIT_LIST_SUCCESS,
		model: model
	}
}
const editListFetching = () => {
	return {
		type: ACTION_EDIT_LIST_FETCHING
	}
}
const editListFetched = (model) => {
	return {
		type: ACTION_EDIT_LIST_FETCHED,
		model: model
	}
}
const editListFetchFail = (error) => {
	return {
		type: ACTION_EDIT_LIST_FETCH_FAIL,
		error: error
	}
}
const editListFail = (error) => {
	return {
		type: ACTION_EDIT_LIST_FAIL,
		error: error
	}
}

export const editListReset = (error) => {
	return {
		type: ACTION_EDIT_LIST_RESET,
		error: error
	}
}

export const fetchEditList = (id) => {
	return (dispatch) => {
		dispatch(editListFetching())
		axios.get('/api/v1/list/' + id + '/', {
			headers: {}
		})
			.then(response => {
				const data = response.data
				dispatch(editListFetched(data.data))
			})
			.catch(error => {
				const errorMsq = error.message
				if (error.response.status === 404) {
					dispatch(editListFetchFail(error.response.data.error))
				} else {
					dispatch(editListFetchFail(errorMsq))
				}
			})
	}
}

export const updateList = (id, title) => {
	return (dispatch) => {
		dispatch(editListSending())
		const json = JSON.stringify({
			id, title
		})
		axios.put(`/api/v1/list/${id}/`, json)
			.then(response => {
				const data = response.data
				dispatch(editListSuccess(data.data))
				dispatch(updateListInList(data.data))
			})
			.catch(error => {
				const errorMsq = error.message
				if (error.response && error.response.status) {
					dispatch(editListFail(error.response.data.error))
				} else {
					dispatch(editListFail(errorMsq))
				}
			})
	}
}
