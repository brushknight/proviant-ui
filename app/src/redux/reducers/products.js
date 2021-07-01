import {
  ACTION_FETCH_PRODUCTS_FAIL,
  ACTION_FETCH_PRODUCTS_LOADING,
  ACTION_FETCH_PRODUCTS_SUCCESS
} from '../actions/const'
import { STATUS_DEFAULT, STATUS_ERROR, STATUS_LOADED, STATUS_LOADING } from './consts'

const initialState = {
  items: [],
  status: STATUS_DEFAULT,
  error: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION_FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        error: action.error,
        status: STATUS_ERROR
      }
    case ACTION_FETCH_PRODUCTS_LOADING:
      return {
        ...state,
        status: STATUS_LOADING,
        error: null
      }

    case ACTION_FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        status: STATUS_LOADED,
        error: null
      }

    default:
      return state
  }
}
