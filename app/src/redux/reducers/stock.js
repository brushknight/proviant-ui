import {
  STATUS_DEFAULT,
  STATUS_ERROR,
  STATUS_LOADED,
  STATUS_LOADING,
  STATUS_SUCCESS
} from './consts'
import {
  ACTION_ADD_STOCK_FAIL,
  ACTION_ADD_STOCK_LOADING,
  ACTION_ADD_STOCK_SUCCESS,
  ACTION_CONSUME_STOCK_FAIL,
  ACTION_CONSUME_STOCK_LOADING, ACTION_CONSUME_STOCK_SUCCESS, ACTION_DELETE_STOCK_SUCCESS,
  ACTION_FETCH_STOCK_FAIL,
  ACTION_FETCH_STOCK_LOADING,
  ACTION_FETCH_STOCK_SUCCESS
} from '../actions/const'

const emptyAddForm = () => {
  return {
    error: null,
    status: STATUS_DEFAULT
  }
}

const emptyConsumeForm = () => {
  return {
    error: null,
    status: STATUS_DEFAULT
  }
}

const initialState = () => {
  return {
    items: [],
    status: STATUS_DEFAULT,
    error: null,
    addForm: emptyAddForm(),
    consumeForm: emptyConsumeForm()
  }
}

export default function (state = initialState(), action) {
  switch (action.type) {
    case ACTION_FETCH_STOCK_SUCCESS:
      return {
        ...state,
        items: action.items || [],
        status: STATUS_LOADED,
        error: null,
        addForm: emptyAddForm(),
        consumeForm: emptyConsumeForm()
      }
    case ACTION_FETCH_STOCK_FAIL:
      return {
        ...state,
        items: [],
        status: STATUS_ERROR,
        error: action.error,
        addForm: emptyAddForm(),
        consumeForm: emptyConsumeForm()
      }
    case ACTION_FETCH_STOCK_LOADING:
      return {
        ...state,
        items: [],
        status: STATUS_LOADING,
        error: null,
        addForm: emptyAddForm(),
        consumeForm: emptyConsumeForm()
      }
    case ACTION_ADD_STOCK_LOADING:

      const addFormLoading = state.addForm
      addFormLoading.status = STATUS_LOADING

      return {
        ...state,
        status: STATUS_DEFAULT,
        error: null,
        addForm: addFormLoading
      }
    case ACTION_ADD_STOCK_FAIL:

      const addFormFail = state.addForm
      addFormFail.status = STATUS_ERROR
      addFormFail.error = action.error

      return {
        ...state,
        status: STATUS_DEFAULT,
        error: null,
        addForm: addFormFail
      }
    case ACTION_ADD_STOCK_SUCCESS:

      const addFormSuccess = state.addForm
      addFormSuccess.status = STATUS_SUCCESS

      const itemsAfterNewAdded = state.items
      itemsAfterNewAdded.unshift(action.item)

      return {
        ...state,
        items: itemsAfterNewAdded,
        status: STATUS_DEFAULT,
        error: null,
        addForm: addFormSuccess
      }
    case ACTION_CONSUME_STOCK_LOADING:

      const consumeFormLoading = state.consumeForm
      consumeFormLoading.status = STATUS_LOADING

      return {
        ...state,
        status: STATUS_DEFAULT,
        error: null,
        consumeForm: consumeFormLoading
      }
    case ACTION_CONSUME_STOCK_FAIL:

      const consumeFormFail = state.consumeForm
      consumeFormFail.status = STATUS_ERROR
      consumeFormFail.error = action.error

      return {
        ...state,
        status: STATUS_DEFAULT,
        error: null,
        consumeForm: consumeFormFail
      }
    case ACTION_CONSUME_STOCK_SUCCESS:

      const consumeFormSuccess = state.consumeForm
      consumeFormSuccess.status = STATUS_SUCCESS

      return {
        ...state,
        items: action.items,
        status: STATUS_DEFAULT,
        error: null,
        consumeForm: consumeFormSuccess
      }
    case ACTION_DELETE_STOCK_SUCCESS:

      return {
        ...state,
        items: action.items,
        status: STATUS_DEFAULT,
        error: null
      }
    default:
      return state
  }
}
