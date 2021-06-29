import {STATUS_DEFAULT, STATUS_ERROR, STATUS_LOADED, STATUS_LOADING, STATUS_SUCCESS} from "./consts";
import {
    ACTION_ADD_STOCK_FAIL,
    ACTION_ADD_STOCK_LOADING, ACTION_ADD_STOCK_SUCCESS,
    ACTION_CHANGE_STOCK_ADD_FORM_FIELD,
    ACTION_FETCH_STOCK_FAIL,
    ACTION_FETCH_STOCK_LOADING,
    ACTION_FETCH_STOCK_SUCCESS
} from "../actions/const";

export const STOCK_ADD_FORM_QUANTITY = "quantity"
export const STOCK_ADD_FORM_DATE = "date"

const emptyAddForm = {
    quantity: 0,
    error: null,
    date: new Date(),
    status: STATUS_DEFAULT
}

const emptyConsumeForm = {
    quantity: 0,
    error: null,
    status: STATUS_DEFAULT
}

const initialState = {
    items: [],
    status: STATUS_DEFAULT,
    error: null,
    addForm: emptyAddForm,
    consumeForm: emptyConsumeForm
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION_FETCH_STOCK_SUCCESS:
            return {
                ...state,
                items: action.items || [],
                status: STATUS_LOADED,
                error: null,
                addForm: emptyAddForm,
                consumeForm: emptyConsumeForm
            }
        case ACTION_FETCH_STOCK_FAIL:
            return {
                ...state,
                items: [],
                status: STATUS_ERROR,
                error: action.error,
                addForm: emptyAddForm,
                consumeForm: emptyConsumeForm
            }
        case ACTION_FETCH_STOCK_LOADING:
            return {
                ...state,
                items: [],
                status: STATUS_LOADING,
                error: null,
                addForm: emptyAddForm,
                consumeForm: emptyConsumeForm
            }
        case ACTION_ADD_STOCK_LOADING:

            let addFormLoading = state.addForm
            addFormLoading.status = STATUS_LOADING

            return {
                ...state,
                status: STATUS_DEFAULT,
                error: null,
                addForm: addFormLoading,
            }
        case ACTION_ADD_STOCK_FAIL:

            let addFormFail = state.addForm
            addFormFail.status = STATUS_ERROR
            addFormFail.error = action.error

            return {
                ...state,
                status: STATUS_DEFAULT,
                error: null,
                addForm: addFormFail,
            }
        case ACTION_ADD_STOCK_SUCCESS:

            let addFormSuccess = state.addForm
            addFormSuccess.status = STATUS_SUCCESS

            let itemsAfterNewAdded = state.items
            itemsAfterNewAdded.unshift(action.item)

            return {
                ...state,
                items: itemsAfterNewAdded,
                status: STATUS_DEFAULT,
                error: null,
                addForm: addFormSuccess,
            }
        case ACTION_CHANGE_STOCK_ADD_FORM_FIELD:

            let addForm = state.addForm
            addForm.error = null
            addForm.status = STATUS_DEFAULT

            switch (action.field) {
                case STOCK_ADD_FORM_QUANTITY:
                    addForm.quantity = action.value
                    break
                case STOCK_ADD_FORM_DATE:
                    addForm.date = action.value
                    break
                default:
            }

            return {
                ...state,
                status: STATUS_DEFAULT,
                error: null,
                addForm: addForm,
            }
        default:
            return state;
    }
}