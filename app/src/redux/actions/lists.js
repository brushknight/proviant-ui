import axios from "axios";

export const ACTION_FETCH_LIST_SUCCESS = 'fetch/list/success'
export const ACTION_FETCH_LIST_FAIL = 'fetch/list/fail'
export const ACTION_FETCH_LIST_LOADING = 'fetch/list/loading'

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

export const fetchLists = () => {
    return (dispatch) => {
        dispatch(fetchListLoading())
        axios.get("http://localhost:8080/api/v1/list/", {
            headers: {
            },
        })
            .then(response => {
                const data = response.data
                console.log(data)
                dispatch(fetchListSuccess(data.data))
            })
            .catch(error => {
                const errorMsq = error.message
                dispatch(fetchListFail(errorMsq))
            })
    }
}