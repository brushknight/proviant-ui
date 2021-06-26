import axios from "axios";

export const ACTION_FETCH_LIST_SUCCESS = 'fetch/list/success'
export const ACTION_FETCH_LIST_FAIL = 'fetch/list/fail'
export const ACTION_FETCH_LIST_LOADING = 'fetch/list/loading'

export const ACTION_CREATE_LIST_SUCCESS = 'create/list/success'
export const ACTION_CREATE_LIST_FAIL = 'create/list/fail'
export const ACTION_CREATE_LIST_LOADING = 'create/list/loading'

export const ACTION_CHANGE_CREATE_LIST_FORM = 'change/create-list-form'

const fetchListLoading = () => {
    return {
        type: ACTION_FETCH_LIST_LOADING,
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
        type: ACTION_CREATE_LIST_LOADING,
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

export const changeCreateListForm = title => {
    return {
        type: ACTION_CHANGE_CREATE_LIST_FORM,
        title: title
    }
}

export const fetchLists = () => {
    return (dispatch) => {
        dispatch(fetchListLoading())
        axios.get("/api/v1/list/", {
            headers: {
            },
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
        const json = JSON.stringify({ title });
        axios.post("/api/v1/list/", json)
            .then(response => {
                const data = response.data
                dispatch(createListSuccess(data.data))
                console.log(data.data)

            })
            .catch(error => {
                const errorMsq = error.message
                dispatch(createListFail(errorMsq))
            })
    }
}