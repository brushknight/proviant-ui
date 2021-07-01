import axios from 'axios'
import {
  ACTION_CHANGE_PRODUCT_CREATE_FORM_FIELD,
  ACTION_CHANGE_PRODUCT_EDIT_FORM_FIELD,
  ACTION_CREATE_PRODUCT_FAIL, ACTION_CREATE_PRODUCT_RESET,
  ACTION_CREATE_PRODUCT_SENDING,
  ACTION_CREATE_PRODUCT_SUCCESS,
  ACTION_EDIT_PRODUCT_FAIL,
  ACTION_EDIT_PRODUCT_FETCHED,
  ACTION_EDIT_PRODUCT_FETCHING,
  ACTION_EDIT_PRODUCT_SENDING,
  ACTION_EDIT_PRODUCT_SUCCESS, ACTION_RESET_PRODUCT
} from './const'

const createProductSending = () => {
  return {
    type: ACTION_CREATE_PRODUCT_SENDING
  }
}
const createProductSuccess = (model) => {
  return {
    type: ACTION_CREATE_PRODUCT_SUCCESS,
    model: model
  }
}

const createProductFail = (error) => {
  return {
    type: ACTION_CREATE_PRODUCT_FAIL,
    error: error
  }
}
export const createProductFormChangeField = (field, value) => {
  return {
    type: ACTION_CHANGE_PRODUCT_CREATE_FORM_FIELD,
    field: field,
    value: value
  }
}

export const createProductFormReset = () => {
  return {
    type: ACTION_CREATE_PRODUCT_RESET
  }
}

export const createProduct = (model) => {
  return (dispatch) => {
    dispatch(createProductSending())
    const json = JSON.stringify(model)
    axios.post('/api/v1/product/', json)
      .then(response => {
        const data = response.data
        dispatch(createProductSuccess(data.data))
      })
      .catch(error => {
        const errorMsq = error.message
        dispatch(createProductFail(errorMsq))
      })
  }
}
