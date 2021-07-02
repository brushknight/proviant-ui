import {
  ACTION_CREATE_PRODUCT_FAIL,
  ACTION_CREATE_PRODUCT_RESET,
  ACTION_CREATE_PRODUCT_SENDING,
  ACTION_CREATE_PRODUCT_SUCCESS
} from '../actions/const'
import {
  STATUS_CREATED,
  STATUS_DEFAULT,
  STATUS_ERROR,
  STATUS_SENDING
} from './consts'

const emptyModel = () => {
  return {
    title: '',
    description: '',
    link: '',
    image: '',
    barcode: '',
    category_ids: [],
    categories: [],
    list_id: '',
    list: ''
  }
}

const initialState = () => {
  return {
    model: emptyModel(),
    status: STATUS_DEFAULT,
    error: null
  }
}

export default function (state = initialState(), action) {
  switch (action.type) {
    case ACTION_CREATE_PRODUCT_RESET:
      return {
        ...initialState()
      }
    case ACTION_CREATE_PRODUCT_SENDING:
      return {
        ...state,
        status: STATUS_SENDING

      }
    case ACTION_CREATE_PRODUCT_FAIL:
      return {
        ...initialState(),
        status: STATUS_ERROR,
        error: action.error
      }
    case ACTION_CREATE_PRODUCT_SUCCESS:
      return {
        ...initialState(),
        status: STATUS_CREATED,
        model: action.model,
        error: null
      }
    default:
      return state
  }
}
