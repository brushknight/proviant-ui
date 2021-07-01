import axios from 'axios'
import {
  ACTION_ADD_STOCK_FAIL,
  ACTION_ADD_STOCK_LOADING,
  ACTION_ADD_STOCK_SUCCESS,
  ACTION_CHANGE_STOCK_ADD_FORM_FIELD,
  ACTION_CHANGE_STOCK_CONSUME_FORM_FIELD, ACTION_CONSUME_STOCK_FAIL,
  ACTION_CONSUME_STOCK_LOADING,
  ACTION_CONSUME_STOCK_SUCCESS, ACTION_DELETE_STOCK_FAIL, ACTION_DELETE_STOCK_LOADING, ACTION_DELETE_STOCK_SUCCESS,
  ACTION_FETCH_STOCK_FAIL,
  ACTION_FETCH_STOCK_LOADING,
  ACTION_FETCH_STOCK_NOT_FOUND,
  ACTION_FETCH_STOCK_SUCCESS
} from './const'

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

const addStockLoading = () => {
  return {
    type: ACTION_ADD_STOCK_LOADING
  }
}
const addStockSuccess = (item) => {
  return {
    type: ACTION_ADD_STOCK_SUCCESS,
    item: item
  }
}
const addStockFail = (error) => {
  return {
    type: ACTION_ADD_STOCK_FAIL,
    error: error
  }
}

const deleteStockLoading = () => {
  return {
    type: ACTION_DELETE_STOCK_LOADING
  }
}
const deleteStockSuccess = (items) => {
  return {
    type: ACTION_DELETE_STOCK_SUCCESS,
    items: items
  }
}
const deleteStockFail = (error) => {
  return {
    type: ACTION_DELETE_STOCK_FAIL,
    error: error
  }
}

const consumeStockLoading = () => {
  return {
    type: ACTION_CONSUME_STOCK_LOADING
  }
}
const consumeStockSuccess = (items) => {
  return {
    type: ACTION_CONSUME_STOCK_SUCCESS,
    items: items
  }
}
const consumeStockFail = (error) => {
  return {
    type: ACTION_CONSUME_STOCK_FAIL,
    error: error
  }
}

export const stockAddFormFieldChanged = (field, value) => {
  return {
    type: ACTION_CHANGE_STOCK_ADD_FORM_FIELD,
    field: field,
    value: value
  }
}

export const stockConsumeFormFieldChanged = (value) => {
  return {
    type: ACTION_CHANGE_STOCK_CONSUME_FORM_FIELD,
    value: value
  }
}

export const fetchStock = (productId) => {
  return (dispatch) => {
    dispatch(fetchStockLoading())
    axios.get(`/api/v1/product/${productId}/stock/`, {
      headers: {}
    })
      .then(response => {
        const data = response.data
        dispatch(fetchStockSuccess(data.data))
      })
      .catch(error => {
        if (error.response.status === 404) {
          dispatch(fetchStockNotFound(error.response.data.error))
        } else {
          dispatch(fetchStockFail(error.message))
        }
      })
  }
}

export const addStock = (productId, addStockForm) => {
  const dto = {
    quantity: addStockForm.quantity,
    expire: Math.round((+addStockForm.expire) / 1000)
  }

  return (dispatch) => {
    dispatch(addStockLoading())
    const json = JSON.stringify(dto)
    axios.post(`/api/v1/product/${productId}/add/`, json)
      .then(response => {
        const data = response.data
        dispatch(addStockSuccess(data.data))
      })
      .catch(error => {
        if (error.response.status) {
          dispatch(addStockFail(error.response.data.error))
        } else {
          dispatch(addStockFail(error.message))
        }
      })
  }
}

export const consumeStock = (productId, consumeStockForm) => {
  const dto = {
    quantity: consumeStockForm.quantity
  }

  return (dispatch) => {
    dispatch(consumeStockLoading())
    const json = JSON.stringify(dto)
    axios.post(`/api/v1/product/${productId}/consume/`, json)
      .then(response => {
        const data = response.data
        dispatch(consumeStockSuccess(data.data))
      })
      .catch(error => {
        if (error.response.status) {
          dispatch(consumeStockFail(error.response.data.error))
        } else {
          dispatch(consumeStockFail(error.message))
        }
      })
  }
}

export const deleteStock = (productId, id) => {
  return (dispatch) => {
    dispatch(deleteStockLoading())
    axios.delete(`/api/v1/product/${productId}/stock/${id}/`)
      .then(response => {
        const data = response.data
        dispatch(deleteStockSuccess(data.data))
      })
      .catch(error => {
        if (error.response.status) {
          dispatch(deleteStockFail(error.response.data.error))
        } else {
          dispatch(deleteStockFail(error.message))
        }
      })
  }
}
