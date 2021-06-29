import axios from "axios";
import {ACTION_FETCH_STOCK_FAIL, ACTION_FETCH_STOCK_LOADING, ACTION_FETCH_STOCK_SUCCESS, ACTION_FETCH_STOCK_NOT_FOUND} from "./const";

const fetchStockLoading = () => {
    return {
        type: ACTION_FETCH_STOCK_LOADING
    }
}

const fetchStockSuccess = (items) => {
    return {
        type: ACTION_FETCH_STOCK_SUCCESS,
        items: items
    }
}

const fetchStockFail = (error) => {
    return {
        type: ACTION_FETCH_STOCK_FAIL,
        error: error
    }
}
const fetchStockNotFound = (error) => {
    return {
        type: ACTION_FETCH_STOCK_NOT_FOUND,
        error: error
    }
}

export const fetchStock = (productId) => {
    return (dispatch) => {
        dispatch(fetchStockLoading())
        axios.get(`/api/v1/product/${productId}/stock/`, {
            headers: {
            },
        })
            .then(response => {
                const data = response.data
                dispatch(fetchStockSuccess(data.data))
            })
            .catch(error => {
                if (error.response.status === 404){
                    dispatch(fetchStockNotFound(error.response.data.error))
                }else{
                    dispatch(fetchStockFail(error.message))
                }
            })
    }
}
