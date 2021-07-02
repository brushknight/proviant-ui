import {
  PRODUCT_FIELD_CATEGORIES,
  PRODUCT_FIELD_CATEGORY_IDS,
  PRODUCT_FIELD_LIST,
  PRODUCT_FIELD_LIST_ID,
  STATUS_CREATED,
  STATUS_DEFAULT,
  STATUS_ERROR,
  STATUS_SENDING
} from './consts'
import {
  ACTION_CHANGE_PRODUCT_CREATE_FORM_FIELD,
  ACTION_CREATE_PRODUCT_FAIL,
  ACTION_CREATE_PRODUCT_RESET,
  ACTION_CREATE_PRODUCT_SENDING,
  ACTION_CREATE_PRODUCT_SUCCESS
} from '../actions/const'

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
    case ACTION_CHANGE_PRODUCT_CREATE_FORM_FIELD:

      const editModel = state.model

      editModel[action.field] = action.value

      if (action.field === PRODUCT_FIELD_LIST) {
        editModel[PRODUCT_FIELD_LIST_ID] = action.value.id
      }

      if (action.field === PRODUCT_FIELD_CATEGORIES) {
        editModel[PRODUCT_FIELD_CATEGORY_IDS] = action.value.map(item => item.id)
      }

      return {
        ...state,
        model: editModel,
        status: STATUS_DEFAULT

      }
    default:
      return state
  }
}
