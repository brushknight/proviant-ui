import {
	ACTION_DELETE_LIST_FAIL,
	ACTION_DELETE_LIST_IN_LIST,
	ACTION_DELETE_LIST_SUCCESS,
	ACTION_EDIT_LIST_FAIL,
	ACTION_EDIT_LIST_FETCH_FAIL,
	ACTION_EDIT_LIST_FETCHED,
	ACTION_EDIT_LIST_FETCHING,
	ACTION_EDIT_LIST_RESET,
	ACTION_EDIT_LIST_SENDING,
	ACTION_EDIT_LIST_SUCCESS
} from '../const'
import { generateCoreApiUrl, generateHeaders } from '../../../utils/link'
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

const deleteListSuccess = (error) => {
	return {
		type: ACTION_DELETE_LIST_SUCCESS,
		error: error
	}
}
const deleteListInList = (id) => {
	return {
		type: ACTION_DELETE_LIST_IN_LIST,
		id
	}
}
const deleteListFail = (error) => {
	return {
		type: ACTION_DELETE_LIST_FAIL,
		error: error
	}
}

export const editListReset = (error) => {
	return {
		type: ACTION_EDIT_LIST_RESET,
		error: error
	}
}

export const fetchEditList = (id, locale) => {
	return (dispatch) => {
		dispatch(editListFetching())
		generateHeaders(locale).then(headers => {
			axios.get(generateCoreApiUrl(`/list/${id}/`), headers)
				.then(response => {
					const data = response.data
					dispatch(editListFetched(data.data))
				})
				.catch(error => {
					const errorMsq = error.message
					if (error.response && error.response.status === 404) {
						dispatch(editListFetchFail(error.response.data.error))
					} else {
						dispatch(editListFetchFail(errorMsq))
					}
				})
		})
	}
}

export const updateList = (id, title, locale) => {
	return (dispatch) => {
		dispatch(editListSending())
		const json = JSON.stringify({
			id, title
		})
		generateHeaders(locale).then(headers => {
			axios.put(generateCoreApiUrl(`/list/${id}/`), json, headers)
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
		})
	}
}

export const deleteList = (id, locale) => {
	return (dispatch) => {
		generateHeaders(locale).then(headers => {
			axios.delete(generateCoreApiUrl(`/list/${id}/`), gheaders)
				.then(response => {
					const data = response.data
					dispatch(deleteListSuccess(data.data))
					dispatch(deleteListInList(id))
				})
				.catch(error => {
					const errorMsq = error.message
					if (error.response && error.response.status) {
						dispatch(deleteListFail(error.response.data.error))
					} else {
						dispatch(deleteListFail(errorMsq))
					}
				})
		})
	}
}
