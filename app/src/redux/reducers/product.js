import {
    ACTION_CHANGE_PRODUCT_FIELD,
    ACTION_CREATE_PRODUCT_SUCCESS,
    ACTION_DELETE_PRODUCT_FAIL,
    ACTION_DELETE_PRODUCT_LOADING, ACTION_DELETE_PRODUCT_SUCCESS,
    ACTION_FETCH_PRODUCT_FAIL, ACTION_FETCH_PRODUCT_FORM_SUCCESS,
    ACTION_FETCH_PRODUCT_LOADING,
    ACTION_FETCH_PRODUCT_NOT_FOUND,
    ACTION_FETCH_PRODUCT_SUCCESS,
    ACTION_RESET_PRODUCT,
    ACTION_UPDATE_PRODUCT_FAIL,
    ACTION_UPDATE_PRODUCT_LOADING,
    ACTION_UPDATE_PRODUCT_SUCCESS
} from "../actions/const";
import {
    PRODUCT_FIELD_CATEGORIES, PRODUCT_FIELD_CATEGORY_IDS,
    PRODUCT_FIELD_LIST, PRODUCT_FIELD_LIST_ID,
    STATUS_CREATED,
    STATUS_DEFAULT,
    STATUS_ERROR,
    STATUS_LOADED,
    STATUS_LOADING,
    STATUS_NOT_FOUND,
    STATUS_SUCCESS,
    STATUS_UPDATED
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
    form: emptyForm,
    status: STATUS_DEFAULT,
    error: "",
    deleteStatus: STATUS_DEFAULT
}

export default function (state = initialState, action) {

    switch (action.type) {
        case ACTION_RESET_PRODUCT:

            console.log("reset reducer")

            return {
                ...state,
                error: null,
                status: STATUS_DEFAULT,
                model: emptyModel,
                form: emptyForm,
                deleteStatus: STATUS_DEFAULT
            }
        case ACTION_FETCH_PRODUCT_FAIL:
            return {
                ...state,
                error: action.error,
                status: STATUS_ERROR,
                form: emptyForm,
                deleteStatus: STATUS_DEFAULT
            }
        case ACTION_FETCH_PRODUCT_NOT_FOUND:
            return {
                ...state,
                error: action.error,
                status: STATUS_NOT_FOUND,
                form: emptyForm,
                deleteStatus: STATUS_DEFAULT
            }
        case ACTION_FETCH_PRODUCT_LOADING:
            return {
                ...state,
                status: STATUS_LOADING,
                error: null,
                form: emptyForm,
                deleteStatus: STATUS_DEFAULT
            }

        case ACTION_FETCH_PRODUCT_SUCCESS:
            return {
                ...state,
                model: action.model,

                status: STATUS_LOADED,
                error: null,
                form: emptyForm,
                deleteStatus: STATUS_DEFAULT
            }
        case ACTION_FETCH_PRODUCT_FORM_SUCCESS:

            let formFetched = emptyForm
            formFetched.model = action.model

            return {
                ...state,
                model: emptyModel,
                status: STATUS_LOADED,
                error: null,
                form: formFetched,
                deleteStatus: STATUS_DEFAULT
            }
        case ACTION_UPDATE_PRODUCT_LOADING:
            return {
                ...state,
                formStatus: STATUS_LOADING,
                form: emptyForm,
                status: STATUS_DEFAULT,
                deleteStatus: STATUS_DEFAULT
            }
        case ACTION_UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                error: "",
                form: emptyForm,
                status: STATUS_DEFAULT,
                deleteStatus: STATUS_DEFAULT
            }
        case ACTION_UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                form: emptyForm,
                error: null,
                status: STATUS_DEFAULT,
                model: action.model,
                deleteStatus: STATUS_DEFAULT
            }
        case ACTION_CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                error: null,
                status: STATUS_CREATED,
                form: emptyForm,
                model: action.model,
                deleteStatus: STATUS_DEFAULT
            }
        case ACTION_CHANGE_PRODUCT_FIELD:

            let model = state.form.model
            model[action.field] = action.value

            if (action.field === PRODUCT_FIELD_LIST){
                model[PRODUCT_FIELD_LIST_ID] = action.value.id
            }

            if (action.field === PRODUCT_FIELD_CATEGORIES){
                model[PRODUCT_FIELD_CATEGORY_IDS] = action.value.map(item => item.id)
            }

            let form = state.form
            form.model = model
            form.status = STATUS_DEFAULT
            form.error = null

            return {
                ...state,
                error: null,
                status: STATUS_DEFAULT,
                model: emptyModel,
                form: form,
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

