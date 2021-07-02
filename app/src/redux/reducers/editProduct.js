import {
  PRODUCT_FIELD_CATEGORIES,
  PRODUCT_FIELD_CATEGORY_IDS,
  PRODUCT_FIELD_LIST,
  PRODUCT_FIELD_LIST_ID,
  STATUS_DEFAULT, STATUS_ERROR, STATUS_FETCHED, STATUS_FETCHING, STATUS_SENDING, STATUS_UPDATED
} from './consts'
import {
  ACTION_CHANGE_PRODUCT_EDIT_FORM_FIELD, ACTION_EDIT_PRODUCT_FAIL, ACTION_EDIT_PRODUCT_FETCHED,
  ACTION_EDIT_PRODUCT_FETCHING,
  ACTION_EDIT_PRODUCT_SENDING, ACTION_EDIT_PRODUCT_SUCCESS
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
    case ACTION_EDIT_PRODUCT_FETCHED:
      return {
        ...initialState(),
        model: action.model,
        status: STATUS_FETCHED
      }
    case ACTION_EDIT_PRODUCT_FETCHING:
      return {
        ...initialState(),
        model: emptyModel(),
        status: STATUS_FETCHING
      }
    case ACTION_EDIT_PRODUCT_SENDING:
      return {
        ...state,
        status: STATUS_SENDING

      }
    case ACTION_EDIT_PRODUCT_FAIL:
      return {
        ...initialState(),
        status: STATUS_ERROR,
        error: action.error
      }
    case ACTION_EDIT_PRODUCT_SUCCESS:
      return {
        ...initialState(),
        status: STATUS_UPDATED,
        model: action.model,
        error: null
      }
    case ACTION_CHANGE_PRODUCT_EDIT_FORM_FIELD:

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
