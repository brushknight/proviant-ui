import {
    ACTION_CHANGE_PRODUCT_CREATE_FORM_FIELD,
    ACTION_CHANGE_PRODUCT_EDIT_FORM_FIELD, ACTION_CREATE_PRODUCT_FAIL, ACTION_CREATE_PRODUCT_SENDING,
    ACTION_CREATE_PRODUCT_SUCCESS,
    ACTION_DELETE_PRODUCT_FAIL,
    ACTION_DELETE_PRODUCT_LOADING,
    ACTION_DELETE_PRODUCT_SUCCESS,
    ACTION_FETCH_PRODUCT_FAIL,
    ACTION_FETCH_PRODUCT_FORM_SUCCESS,
    ACTION_FETCH_PRODUCT_LOADING,
    ACTION_FETCH_PRODUCT_NOT_FOUND,
    ACTION_FETCH_PRODUCT_SUCCESS,
    ACTION_RESET_PRODUCT,
    ACTION_EDIT_PRODUCT_FAIL,
    ACTION_EDIT_PRODUCT_FETCHING, ACTION_EDIT_PRODUCT_SENDING,
    ACTION_EDIT_PRODUCT_SUCCESS
} from "../actions/const";
import {
    PRODUCT_FIELD_CATEGORIES,
    PRODUCT_FIELD_CATEGORY_IDS,
    PRODUCT_FIELD_LIST,
    PRODUCT_FIELD_LIST_ID,
    STATUS_CREATED,
    STATUS_DEFAULT,
    STATUS_ERROR, STATUS_FETCHING,
    STATUS_LOADED,
    STATUS_LOADING,
    STATUS_NOT_FOUND, STATUS_SENDING,
    STATUS_SUCCESS
} from "./consts";

const emptyModel = {
    id: 0,
    title: "",
    description: "",
    link: "",
    image: "",
    barcode: "",
    category_ids: [],
    categories: [],
    list_id: "",
    list: "",
}

const emptyForm = {
    model: emptyModel,
    status: STATUS_DEFAULT,
    error: null
}

const initialState = {
    model: emptyModel,
    createForm: emptyForm,
    editForm: emptyForm,
    status: STATUS_DEFAULT,
    error: "",
    deleteStatus: STATUS_DEFAULT
}

export default function (state = initialState, action) {

    switch (action.type) {
        case ACTION_RESET_PRODUCT:

            return {
                ...state,
                error: null,
                status: STATUS_DEFAULT,
                model: emptyModel,
                createForm: emptyForm,
                editForm: emptyForm,
                deleteStatus: STATUS_DEFAULT
            }
        case ACTION_FETCH_PRODUCT_FAIL:
            return {
                ...state,
                error: action.error,
                status: STATUS_ERROR,
                createForm: emptyForm,
                editForm: emptyForm,
                deleteStatus: STATUS_DEFAULT
            }
        case ACTION_FETCH_PRODUCT_NOT_FOUND:
            return {
                ...state,
                error: action.error,
                status: STATUS_NOT_FOUND,
                createForm: emptyForm,
                editForm: emptyForm,
                deleteStatus: STATUS_DEFAULT
            }
        case ACTION_FETCH_PRODUCT_LOADING:
            return {
                ...state,
                status: STATUS_LOADING,
                error: null,
                createForm: emptyForm,
                editForm: emptyForm,
                deleteStatus: STATUS_DEFAULT
            }

        case ACTION_FETCH_PRODUCT_SUCCESS:
            return {
                ...state,
                model: action.model,

                status: STATUS_LOADED,
                error: null,
                createForm: emptyForm,
                editForm: emptyForm,
                deleteStatus: STATUS_DEFAULT
            }
        case ACTION_FETCH_PRODUCT_FORM_SUCCESS:

            let editFormFetched = emptyForm
            editFormFetched.model = action.model
            editFormFetched.status = STATUS_LOADED

            return {
                ...state,
                model: emptyModel,
                status: STATUS_LOADED,
                error: null,
                editForm: editFormFetched,
                createForm: emptyForm,
                deleteStatus: STATUS_DEFAULT
            }

        case ACTION_CREATE_PRODUCT_SENDING:
            return {
                ...state
            }
        case ACTION_CREATE_PRODUCT_FAIL:
            return {
                ...state
            }
        case ACTION_CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                error: null,
                status: STATUS_CREATED,
                createForm: emptyForm,
                model: action.model,
                deleteStatus: STATUS_DEFAULT
            }

        case ACTION_CHANGE_PRODUCT_CREATE_FORM_FIELD:

            let createForm = emptyForm
            createForm.model = state.createForm.model
            createForm.status = STATUS_DEFAULT
            createForm.error = null

            createForm.model[action.field] = action.value

            if (action.field === PRODUCT_FIELD_LIST){
                createForm.model[PRODUCT_FIELD_LIST_ID] = action.value.id
            }

            if (action.field === PRODUCT_FIELD_CATEGORIES){
                createForm.model[PRODUCT_FIELD_CATEGORY_IDS] = action.value.map(item => item.id)
            }

            return {
                ...state,
                error: null,
                status: STATUS_DEFAULT,
                model: emptyModel,
                createForm: createForm,
                deleteStatus: STATUS_DEFAULT
            }
        case ACTION_DELETE_PRODUCT_LOADING:
            return {
                ...state,
                deleteStatus: STATUS_LOADING
            }
        case ACTION_DELETE_PRODUCT_FAIL:
            return {
                ...state,
                error: action.error,
                deleteStatus: STATUS_ERROR
            }
        case ACTION_DELETE_PRODUCT_SUCCESS:
            return {
                ...initialState,
                deleteStatus: STATUS_SUCCESS
            }
        default:
            return state;
    }
}

