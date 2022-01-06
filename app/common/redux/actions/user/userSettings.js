import {ACTION_USER_SETTINGS_SET_SHOPPING_LIST_SORT_BY} from "../const";

export const setShoppingListSorting = (sortBy) => {
    return {
        type: ACTION_USER_SETTINGS_SET_SHOPPING_LIST_SORT_BY,
        sortBy
    }
}
