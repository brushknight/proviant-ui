import {
    ACTION_USER_SETTINGS_SET_SHOPPING_LIST_SHOW_TAGS,
    ACTION_USER_SETTINGS_SET_SHOPPING_LIST_SORT_BY
} from "../actions/const";

export const USER_SETTINGS_SORT_BY_DUE_DATE = "due_date"
export const USER_SETTINGS_SORT_BY_UPDATE_DATE = "update_date"

export const USER_SETTINGS_SORT_BY_LIST = [
    {label: "По запланированной дате покупки", value: USER_SETTINGS_SORT_BY_DUE_DATE},
    {label: "По дате обновления", value: USER_SETTINGS_SORT_BY_UPDATE_DATE}
]


const emptyShoppingListSettings = () => {
    return {
        sortBy: null,
        showTags: true
    }
}

const initialState = () => {
    return {
        shoppingList: emptyShoppingListSettings()
    }
}

export default function (state = initialState(), action) {
    switch (action.type) {

        case ACTION_USER_SETTINGS_SET_SHOPPING_LIST_SORT_BY:
            return {
                ...state,
                shoppingList: {
                    ...state.shoppingList,
                    sortBy: action.sortBy
                }
            }

        case ACTION_USER_SETTINGS_SET_SHOPPING_LIST_SHOW_TAGS:
            return {
                ...state,
                shoppingList: {
                    ...state.shoppingList,
                    showTags: action.showTags
                }
            }

        default:
            return state
    }
}
