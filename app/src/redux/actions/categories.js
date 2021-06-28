import axios from "axios";

export const ACTION_FETCH_CATEGORIES_SUCCESS = 'fetch/categories/success'
export const ACTION_FETCH_CATEGORIES_FAIL = 'fetch/categories/fail'
export const ACTION_FETCH_CATEGORIES_LOADING = 'fetch/categories/loading'

export const ACTION_CREATE_CATEGORY_SUCCESS = 'create/category/success'
export const ACTION_CREATE_CATEGORY_FAIL = 'create/category/fail'
export const ACTION_CREATE_CATEGORY_LOADING = 'create/category/loading'

export const ACTION_CHANGE_CREATE_CATEGORY_FORM = 'change/create-category-form'


const fetchCategoriesLoading = () => {
    return {
        type: ACTION_FETCH_CATEGORIES_LOADING,
    }
}

const fetchCategoriesFail = error => {
    return {
        type: ACTION_FETCH_CATEGORIES_FAIL,
        error: error
    }
}

const fetchCategoriesSuccess = payload => {
    return {
        type: ACTION_FETCH_CATEGORIES_SUCCESS,
        payload: payload
    }
}

const createCategoryLoading = () => {
    return {
        type: ACTION_CREATE_CATEGORY_LOADING,
    }
}

const createCategoryFail = error => {
    return {
        type: ACTION_CREATE_CATEGORY_FAIL,
        error: error
    }
}

const createCategorySuccess = category => {
    return {
        type: ACTION_CREATE_CATEGORY_SUCCESS,
        category: category
    }
}

export const changeCreateCategoryForm = title => {
    return {
        type: ACTION_CHANGE_CREATE_CATEGORY_FORM,
        title: title
    }
}

export const fetchCategories = () => {
    return (dispatch) => {
        dispatch(fetchCategoriesLoading())
        axios.get("/api/v1/category/", {

        })
            .then(response => {
                const data = response.data
                dispatch(fetchCategoriesSuccess(data.data))
            })
            .catch(error => {
                const errorMsq = error.message
                dispatch(fetchCategoriesFail(errorMsq))
            })
    }
}

export const createCategory = (title) => {
    return (dispatch) => {
        dispatch(createCategoryLoading())
        const json = JSON.stringify({ title });
        axios.post("/api/v1/category/", json)
            .then(response => {
                const data = response.data
                dispatch(createCategorySuccess(data.data))

            })
            .catch(error => {
                const errorMsq = error.message
                if (error.response.status === 400){
                    dispatch(createCategoryFail(error.response.data.error))
                }else{
                    dispatch(createCategoryFail(errorMsq))
                }
            })
    }
}

