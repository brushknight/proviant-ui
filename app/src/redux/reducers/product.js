import {
    ACTION_DELETE_PRODUCT_FAIL,
    ACTION_DELETE_PRODUCT_LOADING,
    ACTION_DELETE_PRODUCT_SUCCESS,
    ACTION_FETCH_PRODUCT_FAIL,
    ACTION_FETCH_PRODUCT_LOADING,
    ACTION_FETCH_PRODUCT_NOT_FOUND,
    ACTION_FETCH_PRODUCT_SUCCESS,
} from "../actions/const";
import {STATUS_DEFAULT, STATUS_ERROR, STATUS_LOADED, STATUS_LOADING, STATUS_NOT_FOUND, STATUS_SUCCESS} from "./consts";

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

