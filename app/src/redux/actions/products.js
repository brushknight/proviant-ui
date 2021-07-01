import axios from 'axios'
import { ACTION_FETCH_PRODUCTS_FAIL, ACTION_FETCH_PRODUCTS_LOADING, ACTION_FETCH_PRODUCTS_SUCCESS } from './const'

const fetchProductLoading = () => {
  return {
    type: ACTION_FETCH_PRODUCTS_LOADING
  }
}

const fetchProductFail = error => {
  return {
    type: ACTION_FETCH_PRODUCTS_FAIL,
    error: error
  }
}

const fetchProductSuccess = payload => {
  return {
    type: ACTION_FETCH_PRODUCTS_SUCCESS,
    payload: payload
  }
}

export const fetchProducts = (query) => {
  let queryString = ''

  const esc = encodeURIComponent
  if (query != null) {
    queryString = '?' + Object.keys(query)
      .map(k => esc(k) + '=' + esc(query[k]))
      .join('&')
  }

  return (dispatch) => {
    dispatch(fetchProductLoading())
    axios.get(`/api/v1/product/${queryString}`, {
      headers: {
      }
    })
      .then(response => {
        const data = response.data
        dispatch(fetchProductSuccess(data.data))
      })
      .catch(error => {
        const errorMsq = error.message
        dispatch(fetchProductFail(errorMsq))
      })
  }
}
