import {
  ACTION_CHANGE_CREATE_CATEGORY_FORM,
  ACTION_CREATE_CATEGORY_FAIL, ACTION_CREATE_CATEGORY_LOADING,
  ACTION_CREATE_CATEGORY_SUCCESS,
  ACTION_FETCH_CATEGORIES_FAIL,
  ACTION_FETCH_CATEGORIES_LOADING,
  ACTION_FETCH_CATEGORIES_SUCCESS
} from '../actions/const'
import { STATUS_DEFAULT, STATUS_ERROR, STATUS_LOADED, STATUS_LOADING } from './consts'

const emptyCreateForm = {
  title: '',
  error: '',
  status: STATUS_DEFAULT
}

const initialState = {
  items: [],
  status: STATUS_DEFAULT,
  error: null,
  createForm: emptyCreateForm
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION_CHANGE_CREATE_CATEGORY_FORM:
      return {
        ...state,
        createForm: {
          title: action.title
        }
      }
    case ACTION_FETCH_CATEGORIES_FAIL:
      return {
        ...state,
        error: action.error,
        status: STATUS_ERROR
      }
    case ACTION_FETCH_CATEGORIES_LOADING:
      return {
        ...state,
        status: STATUS_LOADING,
        error: null
      }

    case ACTION_FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        items: action.payload,
        status: STATUS_LOADED,
        error: null
      }
    case ACTION_CREATE_CATEGORY_SUCCESS:
      const items = state.items
      items.push(action.category)
      return {
        ...state,
        items: items,
        status: STATUS_LOADED,
        error: null,
        createForm: emptyCreateForm
      }
    case ACTION_CREATE_CATEGORY_LOADING:
      const createFormLoading = state.createForm
      createFormLoading.status = STATUS_LOADING

      return {
        ...state,
        status: STATUS_DEFAULT,
        error: null,
        createForm: createFormLoading
      }
    case ACTION_CREATE_CATEGORY_FAIL:

      const createForm = state.createForm
      createForm.status = STATUS_ERROR
      createForm.error = action.error

      return {
        ...state,
        error: '',
        status: STATUS_DEFAULT,
        createForm: createForm
      }
    default:
      return state
  }
}
