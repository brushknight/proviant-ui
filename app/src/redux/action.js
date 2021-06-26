import axios from "axios";

export const ACTION_FETCH_LIST_SUCCESS = 'fetch/list/success'

const fetchListSuccess = payload => {
    return {
        type: ACTION_FETCH_LIST_SUCCESS,
        payload: payload
    }
}

export const fetchLists = () => {
    return (dispatch) => {
        // preloader
        // dispatch()
        axios.get("http://localhost:8080/api/v1/list", {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:9000',
            },
        })
            .then(response => {
                const data = response.data
                console.log(data)
                // data received
                dispatch(fetchListSuccess(data))
            })
            .catch(error => {
                const errorMsq = error.message
                // error
                // dispatch()
            })
    }
}