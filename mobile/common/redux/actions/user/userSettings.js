import {
    ACTION_USER_SETTINGS_SET_SHOPPING_LIST_SHOW_TAGS,
    ACTION_USER_SETTINGS_SET_SHOPPING_LIST_SORT_BY
} from "../const";
import {getVariable, saveVariable} from "../../../utils/storage";

const setShoppingListSortingStore = (sortBy) => {
    return {
        type: ACTION_USER_SETTINGS_SET_SHOPPING_LIST_SORT_BY,
        sortBy
    }
}

const setShoppingListShowTagsStore = (showTags) => {
    return {
        type: ACTION_USER_SETTINGS_SET_SHOPPING_LIST_SHOW_TAGS,
        showTags
    }
}

export const setShoppingListSorting = (sortBy) => {
    return (dispatch) => {
        saveVariable(ACTION_USER_SETTINGS_SET_SHOPPING_LIST_SORT_BY, sortBy).then(() => {
            dispatch(setShoppingListSortingStore(sortBy))
        })
    }
}

export const setShoppingListShowTags = (showTags) => {
    return (dispatch) => {
        saveVariable(ACTION_USER_SETTINGS_SET_SHOPPING_LIST_SHOW_TAGS, `${showTags}`).then(() => {
            dispatch(setShoppingListShowTagsStore(showTags))
         })
    }
}

export const loadShoppingListSorting = () => {
    return (dispatch) => {
        getVariable(ACTION_USER_SETTINGS_SET_SHOPPING_LIST_SORT_BY).then((sortBy) => {
            dispatch(setShoppingListSortingStore(sortBy))
        })
        getVariable(ACTION_USER_SETTINGS_SET_SHOPPING_LIST_SHOW_TAGS).then((showTags) => {
            dispatch(setShoppingListShowTagsStore(showTags === "true"))
        })
    }
}
